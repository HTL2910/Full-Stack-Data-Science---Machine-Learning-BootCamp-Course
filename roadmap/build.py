"""Ghép roadmap/src thành một file HTML duy nhất.

    python roadmap/build.py                 -> roadmap/index.html (mở trực tiếp bằng trình duyệt)
    python roadmap/build.py --fragment OUT  -> bản không có <html>/<head> (dùng để đăng Artifact)
"""
import sys
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"
DATA_FILES = sorted(SRC.glob("data-*.js"))


def build_fragment() -> str:
    html = (SRC / "template.html").read_text(encoding="utf-8")
    data = "\n".join(p.read_text(encoding="utf-8") for p in DATA_FILES)
    html = html.replace("/*STYLE*/", (SRC / "styles.css").read_text(encoding="utf-8"))
    html = html.replace("/*DATA*/", data.replace("</script", "<\\/script"))
    html = html.replace("/*APP*/", (SRC / "app.js").read_text(encoding="utf-8"))
    return html


def build_page() -> str:
    frag = build_fragment()
    return (
        '<!doctype html>\n<html lang="vi">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        "</head>\n<body>\n" + frag + "\n</body>\n</html>\n"
    )


if __name__ == "__main__":
    if len(sys.argv) == 3 and sys.argv[1] == "--fragment":
        Path(sys.argv[2]).write_text(build_fragment(), encoding="utf-8")
        print("fragment ->", sys.argv[2])
    else:
        out = ROOT / "index.html"
        out.write_text(build_page(), encoding="utf-8")
        print("page ->", out)
