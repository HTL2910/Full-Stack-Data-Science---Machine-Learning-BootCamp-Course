/* Mảng Full-stack Web: nền tảng web, React, Remix / React Router, Prisma, production và tích hợp AI.
   Tra cứu tháng 9/2026: Remix v2 đã gộp vào React Router v7 (11/2024); React Router v8 (6/2026) là bản hiện hành;
   Remix 3 là framework khác, bỏ React, còn beta. Prisma ORM 7 (11/2025) bỏ engine Rust. */
window.ROADMAP = window.ROADMAP || [];
window.ROADMAP.push(
{
  id: "s14", track: "web", title: "Nền tảng Web",
  subtitle: "Hiểu trình duyệt, HTTP và ngôn ngữ của web trước khi dùng framework",
  weeks: "4–5 tuần",
  goal: "Đọc hiểu một request/response, dựng giao diện có ngữ nghĩa và dễ tiếp cận, viết JavaScript bất đồng bộ và TypeScript an toàn kiểu.",
  modules: [
    {
      id: "fs-http", title: "HTTP, trình duyệt và cách web hoạt động", level: 1, hours: 10,
      summary: "Request/response, method, status code, header, cookie, cache, CORS, HTTPS: nền của mọi framework.",
      concept: "Trình duyệt gửi request (method, URL, header, body) và nhận response (status, header, body). GET chỉ đọc và có thể cache; POST/PUT/PATCH/DELETE thay đổi dữ liệu. Status 2xx thành công, 3xx chuyển hướng, 4xx lỗi phía client, 5xx lỗi phía server. Cookie giữ phiên đăng nhập; thuộc tính HttpOnly, Secure, SameSite quyết định độ an toàn. Cache-Control điều khiển bộ nhớ đệm. CORS là cơ chế trình duyệt cho phép hoặc chặn request khác nguồn. HTTPS mã hoá kênh truyền. Remix / React Router được thiết kế bám sát các chuẩn này (form, request, response), nên hiểu HTTP là hiểu được phần lớn framework.",
      why: ["Mọi lỗi \"không đăng nhập được\", \"dữ liệu cũ\", \"bị chặn CORS\" đều quy về HTTP.", "Giúp đọc tab Network của DevTools để debug thay vì đoán.", "Kiểm chứng được code AI viết có dùng đúng method và status code không."],
      when: ["Thiết kế API, xử lý đăng nhập, tối ưu tốc độ tải trang, debug lỗi mạng."],
      whenNot: ["Không cần học thuộc mọi header; nắm nhóm quan trọng và tra khi cần."],
      example: { domain: "Thương mại điện tử", title: "Giỏ hàng bị mất sau khi đăng nhập", text: "Cookie phiên được đặt SameSite=Strict nên bị bỏ khi người dùng quay lại từ trang thanh toán của bên thứ ba. Đổi sang SameSite=Lax và kiểm tra lại trên tab Network giải quyết lỗi mà không cần sửa code giao diện." },
      code: { lang: "bash", src: `# Xem toàn bộ header của một request
curl -i https://example.com/api/products?page=2

# Gửi form như trình duyệt (POST, application/x-www-form-urlencoded)
curl -i -X POST https://example.com/cart \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  --data "productId=42&quantity=1" \\
  --cookie "session=abc123"` },
      pitfalls: ["Dùng GET cho thao tác thay đổi dữ liệu (bị prefetch hoặc cache).", "Trả status 200 kèm thông báo lỗi trong body.", "Tắt CORS bằng Access-Control-Allow-Origin: * cho API có cookie."],
      tools: ["DevTools Network", "curl", "HTTPie", "Postman/Bruno"],
      resources: [["MDN — An overview of HTTP", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview"], ["MDN — Using HTTP cookies", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies"], ["web.dev — Learn", "https://web.dev/learn"]]
    },
    {
      id: "fs-html-css", title: "HTML ngữ nghĩa, CSS layout và accessibility", level: 1, hours: 14,
      summary: "Thẻ HTML đúng nghĩa, form chuẩn, flexbox/grid, responsive, và web dùng được cho mọi người.",
      concept: "HTML ngữ nghĩa (header, nav, main, button, label, form) giúp trình đọc màn hình, SEO và bàn phím hoạt động đúng mà không cần thêm code. Form HTML chuẩn (input có name, label gắn id, method, action) là nền của Remix / React Router: form gửi được cả khi JavaScript chưa tải. CSS: box model, flexbox cho một chiều, grid cho hai chiều, media query và đơn vị tương đối cho responsive. Accessibility (a11y): tương phản màu, focus nhìn thấy được, alt cho ảnh, không dùng div thay button, theo WCAG.",
      why: ["Giao diện đúng ngữ nghĩa ít bug hơn và dễ test hơn (Testing Library tìm phần tử theo vai trò).", "Nhiều nước yêu cầu pháp lý về accessibility cho dịch vụ công và thương mại.", "Form chuẩn là thứ giúp progressive enhancement của Remix hoạt động."],
      when: ["Mọi giao diện web.", "Kiểm tra code AI sinh ra có dùng div onClick thay vì button không."],
      whenNot: ["Không cần tự viết CSS framework; dùng Tailwind hoặc thư viện component khi đã hiểu nền."],
      example: { domain: "Dịch vụ công", title: "Form đăng ký không dùng được bằng bàn phím", text: "Nút gửi làm bằng div có onClick nên không focus được bằng Tab và trình đọc màn hình không đọc. Đổi sang thẻ button type=\"submit\" trong form sửa luôn cả lỗi Enter không gửi form." },
      code: { lang: "html", src: `<form method="post" action="/signup">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required autocomplete="email">
  <label for="pw">Mật khẩu</label>
  <input id="pw" name="password" type="password" minlength="8" required>
  <button type="submit">Tạo tài khoản</button>
</form>
<!-- Form này gửi được cả khi JavaScript chưa tải xong -->` },
      pitfalls: ["div onClick thay cho button hoặc link.", "Input không có label.", "Tắt outline focus mà không thay thế."],
      tools: ["DevTools", "Lighthouse", "axe DevTools", "Tailwind CSS"],
      resources: [["web.dev — Learn HTML, CSS, Accessibility", "https://web.dev/learn"], ["MDN — Accessibility", "https://developer.mozilla.org/en-US/docs/Web/Accessibility"], ["WebAIM Million (báo cáo accessibility hằng năm)", "https://webaim.org/projects/million/"]]
    },
    {
      id: "fs-js", title: "JavaScript hiện đại", level: 1, hours: 20,
      summary: "Biến và scope, hàm và closure, object/array, module ES, promise, async/await, event loop, fetch.",
      concept: "JavaScript chạy một luồng với event loop: tác vụ chậm (mạng, timer) được đẩy ra ngoài và trả kết quả qua promise. async/await là cú pháp đọc dễ hơn cho promise; lỗi phải bắt bằng try/catch. Closure là hàm nhớ biến ở phạm vi tạo ra nó, là nền của hook React. Module ES (import/export) chia code thành file. Các phương thức mảng map/filter/reduce và toán tử spread dùng hằng ngày trong React vì React yêu cầu không sửa trực tiếp state (immutability).",
      why: ["React, React Router và Prisma đều là thư viện JavaScript/TypeScript.", "Hiểu promise và event loop giúp tránh lỗi race condition và request chồng chéo.", "Đọc được code AI sinh ra thay vì chỉ chạy thử."],
      when: ["Mọi phần front-end và back-end Node.js."],
      whenNot: ["Tính toán số nặng hoặc ML: để phía Python (FastAPI) làm và gọi qua API."],
      example: { domain: "Tìm kiếm", title: "Kết quả tìm kiếm hiện sai thứ tự", text: "Người dùng gõ nhanh, request cho \"iph\" về sau request cho \"iphone\" nên ghi đè kết quả. Dùng AbortController huỷ request cũ, hoặc để router xử lý (React Router tự huỷ request cũ khi điều hướng)." },
      code: { lang: "ts", src: `// JavaScript: huỷ request cũ khi người dùng gõ tiếp
let controller;
async function search(q) {
  controller?.abort();                 // huỷ request trước
  controller = new AbortController();
  try {
    const res = await fetch("/api/search?q=" + encodeURIComponent(q), { signal: controller.signal });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } catch (err) {
    if (err.name !== "AbortError") throw err;
  }
}` },
      pitfalls: ["Quên await nên nhận Promise thay vì dữ liệu.", "Không kiểm tra res.ok (fetch không ném lỗi với 404/500).", "Sửa trực tiếp mảng/object trong state."],
      tools: ["Node.js 22+", "DevTools", "ESLint", "Biome"],
      resources: [["javascript.info", "https://javascript.info/"], ["MDN — JavaScript Guide", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"]]
    },
    {
      id: "fs-ts", title: "TypeScript và kiểm tra dữ liệu lúc chạy", level: 2, hours: 14,
      summary: "Kiểu, union, narrowing, generics; và vì sao vẫn cần kiểm tra dữ liệu bằng Zod ở biên hệ thống.",
      concept: "TypeScript thêm kiểu tĩnh cho JavaScript, bắt lỗi lúc viết code: gọi sai tên thuộc tính, quên xử lý null, truyền sai kiểu. Các khái niệm cần nắm: kiểu cơ bản, interface/type, union và narrowing (thu hẹp kiểu bằng if), generics, kiểu suy ra từ dữ liệu (React Router sinh kiểu cho loader; Prisma sinh kiểu từ schema). Nhưng kiểu chỉ tồn tại lúc biên dịch: dữ liệu từ form, API, file vẫn phải kiểm tra lúc chạy bằng thư viện như Zod ở biên hệ thống.",
      why: ["Nghiên cứu ICSE 2017 cho thấy TypeScript/Flow phát hiện được khoảng 15% lỗi đã lọt vào các dự án JavaScript công khai.", "Kiểu sinh từ Prisma và React Router nối liền dữ liệu từ database đến giao diện.", "AI viết code TypeScript dễ kiểm chứng hơn vì trình biên dịch bắt phần lớn lỗi sai tên và sai kiểu."],
      when: ["Mọi dự án full-stack nghiêm túc.", "Ở biên hệ thống: form, API bên ngoài, biến môi trường, output của LLM."],
      whenNot: ["Không dùng any hoặc ép kiểu as để tắt lỗi thay vì sửa lỗi."],
      example: { domain: "SaaS", title: "Biến môi trường thiếu làm sập production", text: "DATABASE_URL bị đặt sai tên trên môi trường mới, ứng dụng chạy nhưng lỗi ở request đầu tiên. Kiểm tra biến môi trường bằng Zod ngay khi khởi động giúp lỗi lộ ra lúc deploy thay vì lúc khách hàng dùng." },
      code: { lang: "ts", src: `// TypeScript + Zod: kiểm tra dữ liệu form ở biên hệ thống
import { z } from "zod";

const FlightInput = z.object({
  airline: z.string().min(1),
  stops: z.coerce.number().int().min(0).max(4),
  depTime: z.coerce.date(),
  arrivalTime: z.coerce.date(),
});
type FlightInput = z.infer<typeof FlightInput>;   // kiểu suy ra từ schema

const parsed = FlightInput.safeParse(Object.fromEntries(formData));
if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors };` },
      pitfalls: ["Dùng any hoặc as để tắt lỗi.", "Tin rằng kiểu TypeScript đã kiểm tra dữ liệu người dùng gửi lên.", "Để strict: false trong tsconfig."],
      tools: ["TypeScript", "Zod", "Valibot", "tsc --noEmit"],
      resources: [["TypeScript Handbook", "https://www.typescriptlang.org/docs/handbook/intro.html"], ["Zod", "https://zod.dev/"], ["Gao, Bird, Barr — To Type or Not to Type (ICSE 2017)", "https://earlbarr.com/publications/typestudy.pdf"]]
    }
  ]
},
{
  id: "s15", track: "web", title: "React",
  subtitle: "Xây giao diện từ component và state",
  weeks: "5–6 tuần",
  goal: "Viết component rõ ràng, quản lý state đúng chỗ, biết khi nào không cần useEffect, dùng tính năng React 19 và viết test cho giao diện.",
  modules: [
    {
      id: "fs-react-core", title: "Component, props, state và JSX", level: 1, hours: 14,
      summary: "Giao diện là hàm của state: chia component, truyền props, cập nhật state bất biến, render danh sách có key.",
      concept: "Component là hàm nhận props và trả về JSX mô tả giao diện. State là dữ liệu thay đổi theo thời gian; khi state đổi, React render lại và cập nhật DOM tối thiểu. Nguyên tắc: một nguồn sự thật cho mỗi dữ liệu, đưa state lên component cha chung gần nhất khi nhiều con cần (lifting state), không sửa state trực tiếp mà tạo giá trị mới, danh sách phải có key ổn định (id, không dùng index khi danh sách thay đổi thứ tự).",
      why: ["React là thư viện giao diện phổ biến nhất: 44,7% người tham gia khảo sát Stack Overflow 2025 dùng.", "Nền để học React Router, Next.js, React Native.", "Tư duy \"giao diện là hàm của state\" giúp thiết kế và debug dễ hơn."],
      when: ["Ứng dụng web có tương tác phức tạp, dashboard, sản phẩm SaaS."],
      whenNot: ["Trang nội dung tĩnh ít tương tác: HTML tĩnh hoặc Astro nhẹ hơn nhiều."],
      example: { domain: "Hàng không (repo)", title: "Form dự đoán giá vé bằng component", text: "Chia form thành các component AirlineSelect, StopsInput, TimeRange và PriceResult. State của form nằm ở component cha; PriceResult chỉ nhận giá qua props nên dễ test riêng." },
      code: { lang: "ts", src: `// React (TSX)
type Flight = { id: string; airline: string; price: number };

function FlightList({ flights }: { flights: Flight[] }) {
  const [sortAsc, setSortAsc] = useState(true);
  const sorted = [...flights].sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);
  return (
    <>
      <button onClick={() => setSortAsc(s => !s)}>Sắp xếp theo giá</button>
      <ul>{sorted.map(f => <li key={f.id}>{f.airline}: {f.price.toLocaleString("vi-VN")}</li>)}</ul>
    </>
  );
}` },
      pitfalls: ["Dùng index làm key cho danh sách thay đổi.", "Sửa state trực tiếp (push vào mảng state).", "Sao chép props vào state rồi quên đồng bộ."],
      tools: ["React 19", "Vite", "React DevTools"],
      resources: [["react.dev — Learn", "https://react.dev/learn"], ["react.dev — Thinking in React", "https://react.dev/learn/thinking-in-react"]]
    },
    {
      id: "fs-react-effects", title: "Hooks và useEffect: dùng khi nào, tránh khi nào", level: 2, hours: 10,
      summary: "useState, useRef, useMemo, custom hook; useEffect chỉ để đồng bộ với hệ thống bên ngoài.",
      concept: "Hook là hàm đặc biệt gọi ở đầu component. useEffect dùng để đồng bộ component với hệ thống bên ngoài React (subscription, timer, thư viện không phải React), không phải để tính toán dữ liệu hay xử lý sự kiện. Tài liệu chính thức có hẳn trang \"You Might Not Need an Effect\": tính giá trị suy ra ngay khi render, xử lý sự kiện trong event handler, tải dữ liệu bằng loader của router thay vì useEffect. Effect phải có cleanup và dependency đầy đủ. Từ React Compiler 1.0 (10/2025), phần lớn useMemo/useCallback thủ công không còn cần.",
      why: ["useEffect dùng sai là nguồn lỗi phổ biến nhất trong React: render thừa, vòng lặp vô hạn, race condition.", "AI rất hay sinh useEffect để fetch dữ liệu hoặc đồng bộ state thừa."],
      when: ["Subscription WebSocket, timer, tích hợp thư viện bản đồ hoặc biểu đồ."],
      whenNot: ["Tính giá trị từ props/state (tính thẳng khi render).", "Fetch dữ liệu cho trang khi đã có loader của router.", "Phản hồi sự kiện click hoặc submit."],
      example: { domain: "Dashboard", title: "Dashboard gọi API hai lần mỗi lần mở", text: "Component fetch trong useEffect không có cleanup, StrictMode chạy effect hai lần ở môi trường dev và dữ liệu trả về lệch thứ tự. Chuyển việc tải dữ liệu vào loader của route loại bỏ cả effect lẫn lỗi." },
      code: { lang: "ts", src: `// Không cần effect: tính giá trị suy ra khi render
function Cart({ items }) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);   // không useState + useEffect
  return <p>Tổng: {total}</p>;
}

// Cần effect: đồng bộ với hệ thống bên ngoài, có cleanup
function useOnline() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false);
    window.addEventListener("online", on); window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);
  return online;
}` },
      pitfalls: ["useEffect để set state suy ra từ props.", "Thiếu dependency hoặc tắt cảnh báo eslint.", "Không cleanup subscription."],
      tools: ["eslint-plugin-react-hooks", "React Compiler", "React DevTools Profiler"],
      resources: [["react.dev — You Might Not Need an Effect", "https://react.dev/learn/you-might-not-need-an-effect"], ["react.dev — Synchronizing with Effects", "https://react.dev/learn/synchronizing-with-effects"]]
    },
    {
      id: "fs-react-state", title: "Quản lý state và dữ liệu từ server", level: 2, hours: 10,
      summary: "Phân biệt state giao diện, state trên URL và dữ liệu server; chọn công cụ theo loại state.",
      concept: "Có bốn loại state: state cục bộ (mở/đóng menu) dùng useState; state chia sẻ (theme, người dùng) dùng Context hoặc thư viện nhỏ như Zustand; state trên URL (bộ lọc, trang, tab) nên nằm trong search params để chia sẻ và quay lại được; dữ liệu server (danh sách sản phẩm) là bản sao của database, nên để router (loader/action, revalidation) hoặc TanStack Query quản lý cache và làm mới. Sai lầm phổ biến là đưa dữ liệu server vào global store rồi tự đồng bộ bằng tay.",
      why: ["Chọn đúng loại state loại bỏ phần lớn code đồng bộ thủ công.", "State trên URL giúp chia sẻ link, nút Back hoạt động đúng."],
      when: ["Thiết kế bất kỳ màn hình có bộ lọc, phân trang, form nhiều bước."],
      whenNot: ["Không thêm Redux hoặc global store khi loader của router và useState đã đủ."],
      example: { domain: "Thương mại điện tử", title: "Bộ lọc sản phẩm không chia sẻ được link", text: "Bộ lọc giá và thương hiệu lưu trong useState nên khi gửi link cho người khác thì mất. Chuyển bộ lọc vào search params (?brand=a&max=500) và để loader đọc từ URL: link chia sẻ được, nút Back hoạt động, server render đúng." },
      code: { lang: "ts", src: `// React Router: bộ lọc nằm trên URL, loader đọc và truy vấn
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const brand = url.searchParams.get("brand") ?? undefined;
  return { products: await db.product.findMany({ where: { brand }, take: 20 }) };
}

export default function Products({ loaderData }: Route.ComponentProps) {
  const [params, setParams] = useSearchParams();
  return (
    <select value={params.get("brand") ?? ""} onChange={e => setParams({ brand: e.target.value })}>
      <option value="">Tất cả</option><option value="apple">Apple</option>
    </select>
  );
}` },
      pitfalls: ["Chép dữ liệu server vào global store.", "Bộ lọc không nằm trên URL.", "Nhiều nguồn sự thật cho cùng một dữ liệu."],
      tools: ["useState/useReducer", "Context", "Zustand", "TanStack Query", "URL search params"],
      resources: [["react.dev — Managing State", "https://react.dev/learn/managing-state"], ["TanStack Query docs", "https://tanstack.com/query/latest"]]
    },
    {
      id: "fs-react19", title: "React 19: Actions, Server Components, React Compiler", level: 3, hours: 8,
      summary: "Actions và useActionState, useOptimistic, use(), Server Components, React Compiler tự memo hoá.",
      concept: "React 19 (12/2024) lấy Actions làm trung tâm: hàm bất đồng bộ gắn vào form, React tự quản trạng thái pending, lỗi và cập nhật lạc quan qua useActionState, useFormStatus, useOptimistic. Server Components chạy trên server, không gửi JavaScript của chúng xuống trình duyệt, đọc được database trực tiếp. React Compiler 1.0 (10/2025) tự memo hoá nên hầu hết useMemo/useCallback thủ công không còn cần. Các framework (Next.js, React Router) đưa những tính năng này vào theo cách riêng; React Router framework mode giải bài toán tương tự bằng loader/action.",
      why: ["Hiểu mô hình mới để đọc tài liệu và code mẫu hiện đại.", "Biết framework nào hỗ trợ tính năng nào để không dùng sai chỗ."],
      when: ["Dự án mới trên React 19; form cần trạng thái pending và cập nhật lạc quan."],
      whenNot: ["Không cần Server Components để có SSR tốt: loader của React Router đã đủ cho phần lớn ứng dụng."],
      example: { domain: "Mạng xã hội", title: "Nút thích phản hồi tức thì", text: "useOptimistic cập nhật số lượt thích ngay khi bấm, gửi Action lên server ở nền, tự hoàn tác nếu server báo lỗi. Người dùng không phải chờ vòng mạng." },
      code: { lang: "ts", src: `// React 19: useActionState quản lý pending và lỗi của form
function Subscribe() {
  const [state, formAction, isPending] = useActionState(async (_prev, formData) => {
    const res = await fetch("/api/subscribe", { method: "POST", body: formData });
    return res.ok ? { ok: true } : { error: "Không đăng ký được, thử lại sau" };
  }, null);
  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <button disabled={isPending}>{isPending ? "Đang gửi…" : "Đăng ký"}</button>
      {state?.error && <p role="alert">{state.error}</p>}
    </form>
  );
}` },
      pitfalls: ["Trộn mẫu cũ và mới trong cùng dự án không có lý do.", "Đưa secret vào component tưởng là server nhưng thực ra là client."],
      tools: ["React 19", "React Compiler", "React DevTools"],
      resources: [["react.dev — React v19", "https://react.dev/blog/2024/12/05/react-19"], ["react.dev — React Compiler", "https://react.dev/learn/react-compiler"]]
    },
    {
      id: "fs-react-test", title: "Test giao diện: Vitest và Testing Library", level: 2, hours: 8,
      summary: "Test hành vi mà người dùng thấy, tìm phần tử theo vai trò, mock mạng ở ranh giới.",
      concept: "Testing Library khuyến khích test như người dùng: tìm nút theo vai trò và tên (getByRole('button', { name: 'Đăng ký' })), gõ, bấm, rồi kiểm tra kết quả hiển thị, thay vì kiểm tra state nội bộ. Vitest chạy test nhanh với Vite. Mock mạng ở ranh giới bằng MSW thay vì mock từng hàm. Kim tự tháp test: nhiều test đơn vị và tích hợp nhỏ, ít test E2E (xem giai đoạn 18).",
      why: ["Test theo vai trò đồng thời kiểm tra accessibility.", "Test cho phép sửa hoặc để AI refactor mà vẫn biết có làm hỏng gì không."],
      when: ["Component có logic: form, bộ lọc, tính toán giá."],
      whenNot: ["Không snapshot test toàn bộ trang: dễ vỡ, ít giá trị."],
      example: { domain: "Hàng không (repo)", title: "Test form dự đoán giá vé", text: "Test gõ giờ đi 22:20, giờ đến 01:10, bấm Dự đoán, và kiểm tra thời lượng hiển thị là 2 giờ 50 phút: chính là lỗi qua nửa đêm trong app.py của repo." },
      code: { lang: "ts", src: `import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("tính thời lượng chuyến bay qua nửa đêm", async () => {
  render(<FlightForm />);
  await userEvent.type(screen.getByLabelText("Giờ đi"), "22:20");
  await userEvent.type(screen.getByLabelText("Giờ đến"), "01:10");
  await userEvent.click(screen.getByRole("button", { name: "Dự đoán" }));
  expect(screen.getByText("Thời lượng: 2 giờ 50 phút")).toBeInTheDocument();
});` },
      pitfalls: ["Test chi tiết cài đặt (state, tên class).", "Dùng getByTestId cho mọi thứ thay vì vai trò.", "Test phụ thuộc thứ tự chạy."],
      tools: ["Vitest", "Testing Library", "MSW", "jest-axe"],
      resources: [["Testing Library — Guiding principles", "https://testing-library.com/docs/guiding-principles"], ["Vitest", "https://vitest.dev/"]]
    }
  ]
},
{
  id: "s16", track: "web", title: "Remix / React Router framework",
  subtitle: "Full-stack với loader, action và form theo chuẩn web",
  weeks: "5–6 tuần",
  goal: "Xây ứng dụng full-stack bằng React Router framework mode (hậu thân của Remix): route lồng nhau, loader/action, form, xử lý lỗi, xác thực, chọn cách render và deploy.",
  modules: [
    {
      id: "fs-rr-routing", title: "Từ Remix đến React Router v8: route lồng nhau", level: 2, hours: 8,
      summary: "Remix v2 đã gộp vào React Router v7 (11/2024); v8 (6/2026) là bản hiện hành. Route module, route lồng nhau, Outlet.",
      concept: "Tháng 11/2024, React Router v7 ra đời như phiên bản kế tiếp của cả React Router v6 và Remix v2: bundler và runtime server của Remix chuyển vào React Router thành \"framework mode\". React Router v8 (17/6/2026) bật middleware mặc định, chỉ còn ESM, bỏ gói react-router-dom, và đánh dấu Remix v2 cùng React Router v6 hết hỗ trợ. Remix 3 là framework khác, bỏ React, vẫn đang beta: nên theo dõi chứ chưa nên dùng cho sản phẩm. Trong framework mode, mỗi route là một module (loader, action, component, ErrorBoundary); route lồng nhau hiển thị qua Outlet và tải dữ liệu song song.",
      why: ["Biết đúng tên và phiên bản giúp đọc tài liệu đúng và phát hiện code AI dùng API cũ (import từ @remix-run/*, react-router-dom).", "Route lồng nhau giúp chia layout và dữ liệu theo phần của trang."],
      when: ["Ứng dụng full-stack React cần SSR, form, dữ liệu theo route.", "Nâng cấp dự án Remix v2 cũ."],
      whenNot: ["Trang tĩnh thuần nội dung: Astro hoặc site tĩnh đơn giản hơn.", "Đội đã chuẩn hoá Next.js và cần Server Components sâu."],
      example: { domain: "Thương mại điện tử", title: "Shopify Hydrogen chuyển sang React Router 7", text: "Framework storefront Hydrogen của Shopify chuyển từ Remix v2 sang React Router 7 vào cuối 2024. Theo báo cáo của một agency, codemod tự động xử lý khoảng 85% việc đổi import, phần còn lại (cấu hình route tuỳ chỉnh) phải sửa tay (vendor/blog)." },
      code: { lang: "ts", src: `// app/routes.ts — khai báo route (framework mode)
import { type RouteConfig, route, layout, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/dashboard/layout.tsx", [          // layout chung, có <Outlet />
    route("flights", "routes/dashboard/flights.tsx"),
    route("flights/:id", "routes/dashboard/flight.tsx"),
  ]),
] satisfies RouteConfig;` },
      pitfalls: ["Làm theo tutorial Remix v1/v2 cũ (import @remix-run/*).", "Dùng react-router-dom trên v8 (đã bỏ).", "Nhầm Remix 3 với Remix v2."],
      tools: ["React Router v8", "Vite", "create-react-router"],
      resources: [["Remix — Merging Remix and React Router", "https://remix.run/blog/merging-remix-and-react-router"], ["React Router — Framework mode docs", "https://reactrouter.com/start/framework/installation"], ["InfoQ — React Router v8 (8/2026)", "https://www.infoq.com/news/2026/08/react-route-v8/"]]
    },
    {
      id: "fs-rr-data", title: "Loader, action và form: luồng dữ liệu full-stack", level: 2, hours: 12,
      summary: "Loader đọc dữ liệu trên server, action xử lý form, router tự làm mới dữ liệu sau mỗi action.",
      concept: "Loader chạy trên server trước khi render route, trả dữ liệu cho component qua loaderData (có kiểu tự sinh). Action xử lý request POST/PUT/DELETE từ Form; sau khi action xong, router tự gọi lại các loader liên quan (revalidation) nên giao diện luôn khớp dữ liệu mới mà không cần đồng bộ tay. Form của React Router là form HTML được nâng cấp: không có JavaScript vẫn gửi được (progressive enhancement), có JavaScript thì không tải lại trang. useFetcher cho các tương tác không điều hướng (thích, thêm vào giỏ). Kiểm tra dữ liệu trong action bằng Zod và trả lỗi theo trường.",
      why: ["Bỏ gần hết code fetch, useEffect và state loading thủ công.", "Dữ liệu và thao tác nằm cạnh route nên dễ đọc, dễ test.", "Form vẫn hoạt động khi JavaScript lỗi hoặc mạng chậm."],
      when: ["Mọi trang đọc hoặc ghi dữ liệu trong ứng dụng React Router framework mode."],
      whenNot: ["Dữ liệu thời gian thực liên tục (chat, giá chứng khoán): kết hợp WebSocket/SSE."],
      example: { domain: "Hàng không (repo)", title: "Form dự đoán giá vé không cần useEffect", text: "Action nhận form, kiểm tra bằng Zod, gọi API FastAPI của mô hình, lưu lịch sử dự đoán bằng Prisma rồi trả kết quả. Loader của trang lịch sử tự làm mới sau action, không có dòng đồng bộ nào viết tay." },
      code: { lang: "ts", src: `// app/routes/predict.tsx
export async function action({ request }: Route.ActionArgs) {
  const parsed = FlightInput.safeParse(Object.fromEntries(await request.formData()));
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors };
  const res = await fetch(process.env.MODEL_URL + "/predict", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });
  if (!res.ok) throw new Response("Dịch vụ dự đoán lỗi", { status: 502 });
  const { price } = await res.json();
  await db.prediction.create({ data: { ...parsed.data, price } });
  return { price };
}

export default function Predict({ actionData }: Route.ComponentProps) {
  const nav = useNavigation();
  return (
    <Form method="post">
      {/* các input airline, stops, depTime, arrivalTime */}
      <button disabled={nav.state === "submitting"}>Dự đoán</button>
      {actionData?.price && <p>Giá dự kiến: {actionData.price.toLocaleString("vi-VN")}</p>}
    </Form>
  );
}` },
      pitfalls: ["Fetch trong useEffect thay vì loader.", "Không kiểm tra dữ liệu form trong action.", "Trả toàn bộ bản ghi database (kể cả trường nhạy cảm) cho client."],
      tools: ["React Router", "Zod", "Conform"],
      resources: [["React Router — Data loading", "https://reactrouter.com/start/framework/data-loading"], ["React Router — Actions", "https://reactrouter.com/start/framework/actions"]]
    },
    {
      id: "fs-rr-ux", title: "Pending UI, optimistic UI, streaming và error boundary", level: 3, hours: 8,
      summary: "Cho người dùng thấy trạng thái đang xử lý, cập nhật lạc quan, stream phần chậm, và xử lý lỗi theo từng route.",
      concept: "useNavigation và fetcher.state cho biết đang tải hay đang gửi để hiện trạng thái chờ. Optimistic UI hiển thị kết quả dự kiến ngay từ dữ liệu form, rồi router làm mới khi server trả về. Loader có thể trả promise cho phần dữ liệu chậm, component dùng Suspense và Await để hiện phần nhanh trước (streaming). ErrorBoundary ở mỗi route bắt lỗi của route đó, phần còn lại của trang vẫn dùng được; dùng isRouteErrorResponse để phân biệt lỗi 404 chủ động và lỗi không lường trước.",
      why: ["Trải nghiệm tốt khi mạng chậm, đặc biệt trên di động.", "OWASP Top 10:2025 thêm hạng mục \"Mishandling of Exceptional Conditions\": xử lý lỗi là một phần của bảo mật và độ bền."],
      when: ["Form, danh sách có thao tác nhanh, trang có phần dữ liệu chậm (báo cáo, gợi ý)."],
      whenNot: ["Không dùng optimistic UI cho thao tác có hậu quả lớn (thanh toán): chờ xác nhận thật."],
      example: { domain: "Du lịch", title: "Trang chi tiết chuyến bay có phần giá dự đoán chậm", text: "Thông tin chuyến bay hiển thị ngay; phần giá dự đoán gọi mô hình mất 800 ms được stream sau với khung chờ. Nếu mô hình lỗi, chỉ khối giá hiện thông báo, phần còn lại vẫn dùng được." },
      code: { lang: "ts", src: `export async function loader({ params }: Route.LoaderArgs) {
  const flight = await db.flight.findUniqueOrThrow({ where: { id: params.id } });
  const prediction = getPrediction(flight);        // không await: stream sau
  return { flight, prediction };
}

export default function FlightPage({ loaderData }: Route.ComponentProps) {
  return (<>
    <h1>{loaderData.flight.code}</h1>
    <Suspense fallback={<p>Đang dự đoán giá…</p>}>
      <Await resolve={loaderData.prediction} errorElement={<p>Chưa dự đoán được giá.</p>}>
        {(p) => <p>Giá dự kiến: {p.price}</p>}
      </Await>
    </Suspense>
  </>);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) return <p>Không tìm thấy chuyến bay.</p>;
  return <p>Có lỗi xảy ra, vui lòng thử lại.</p>;           // không lộ stack trace
}` },
      pitfalls: ["Hiện stack trace hoặc thông báo lỗi nội bộ cho người dùng.", "Không có ErrorBoundary nên một lỗi làm trắng cả trang.", "Optimistic UI không hoàn tác khi server báo lỗi."],
      tools: ["React Router", "Suspense", "Sentry"],
      resources: [["React Router — Pending UI", "https://reactrouter.com/start/framework/pending-ui"], ["React Router — Error boundaries", "https://reactrouter.com/how-to/error-boundary"]]
    },
    {
      id: "fs-rr-auth", title: "Session, xác thực, phân quyền và middleware", level: 3, hours: 10,
      summary: "Cookie session HttpOnly, đăng nhập an toàn, phân quyền ở server; từ v8 bảo vệ route bằng middleware.",
      concept: "Phiên đăng nhập nên lưu trong cookie HttpOnly, Secure, SameSite=Lax được ký (createCookieSessionStorage) hoặc session lưu phía server; không lưu token trong localStorage vì script độc hại đọc được. Mật khẩu băm bằng argon2 hoặc bcrypt. Phân quyền phải kiểm tra ở server trong loader/action cho mọi request, kể cả khi giao diện đã ẩn nút. Lưu ý quan trọng: loader của các route lồng nhau chạy song song, nên redirect ở loader cha không chặn loader con; từ React Router v8, middleware bật mặc định và là nơi đúng để bảo vệ cả nhánh route. Với sản phẩm thật, cân nhắc thư viện xác thực có sẵn (Better Auth, Auth.js, dịch vụ như Clerk) thay vì tự viết mọi thứ.",
      why: ["Broken Access Control đứng đầu OWASP Top 10:2025; Authentication Failures đứng thứ 7.", "AI rất hay sinh code chỉ ẩn nút ở giao diện mà không kiểm tra quyền ở server."],
      when: ["Mọi ứng dụng có người dùng đăng nhập hoặc dữ liệu riêng."],
      whenNot: ["Không tự viết mã hoá hoặc thuật toán băm."],
      example: { domain: "SaaS", title: "Lộ dữ liệu của khách khác qua đổi id trên URL", text: "Trang /invoices/:id chỉ kiểm tra người dùng đã đăng nhập, không kiểm tra hoá đơn có thuộc về người đó không; đổi id là xem được hoá đơn của công ty khác (lỗi IDOR). Sửa bằng truy vấn where { id, ownerId: user.id } trong loader." },
      code: { lang: "ts", src: `// app/middleware/auth.ts — React Router v8: middleware bảo vệ cả nhánh route
export const requireUser: Route.MiddlewareFunction = async ({ request, context }, next) => {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  if (!userId) throw redirect("/login");
  context.set(userContext, await db.user.findUniqueOrThrow({ where: { id: userId } }));
  return next();
};

// Trong loader: luôn lọc theo chủ sở hữu, không chỉ theo id
const invoice = await db.invoice.findFirst({ where: { id: params.id, ownerId: user.id } });
if (!invoice) throw new Response("Not found", { status: 404 });` },
      pitfalls: ["Chỉ ẩn nút ở giao diện mà không kiểm tra quyền ở server.", "Lưu token trong localStorage.", "Redirect ở loader cha và tưởng loader con đã được bảo vệ.", "Truy vấn theo id mà không lọc theo chủ sở hữu (IDOR)."],
      tools: ["createCookieSessionStorage", "Better Auth", "Auth.js", "argon2"],
      resources: [["React Router — Sessions and cookies", "https://reactrouter.com/explanation/sessions-and-cookies"], ["React Router — Middleware", "https://reactrouter.com/how-to/middleware"], ["OWASP — Authentication Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"]]
    },
    {
      id: "fs-rr-render", title: "Cách render, deploy và chọn framework", level: 2, hours: 6,
      summary: "SSR, SPA, pre-render; adapter deploy; so sánh React Router framework mode với Next.js.",
      concept: "React Router framework mode hỗ trợ SSR (render trên server mỗi request), SPA mode (chỉ client, deploy như file tĩnh), và pre-render (sinh HTML lúc build cho trang tĩnh), có thể trộn theo route. Deploy lên Node server, Docker, hoặc nền tảng edge/serverless qua adapter. So với Next.js: Next.js phổ biến hơn (20,8% so với chưa có số liệu riêng cho Remix trong khảo sát Stack Overflow 2025) và đầu tư mạnh vào Server Components; React Router bám chuẩn web (form, request, response), ít \"phép màu\", nâng cấp đều đặn theo năm. Chọn theo đội ngũ và yêu cầu, không theo trào lưu.",
      why: ["Chọn sai cách render làm chậm trang hoặc tăng chi phí server.", "Biết đánh đổi để phản biện khi AI đề xuất \"chuyển sang framework X\"."],
      when: ["Bắt đầu dự án mới, hoặc trang có yêu cầu SEO và tốc độ tải đầu."],
      whenNot: ["Không đổi framework giữa dự án chỉ vì bài viết so sánh."],
      example: { domain: "Nội dung", title: "Trang giới thiệu pre-render, dashboard SSR", text: "Trang chủ và trang giá được pre-render thành HTML tĩnh nên tải rất nhanh và rẻ; dashboard cần dữ liệu riêng từng người nên dùng SSR có session." },
      code: { lang: "ts", src: `// react-router.config.ts
import type { Config } from "@react-router/dev/config";
export default {
  ssr: true,                                   // SSR mặc định
  async prerender() { return ["/", "/pricing", "/about"]; },   // trang tĩnh sinh lúc build
} satisfies Config;` },
      pitfalls: ["SSR mọi trang kể cả trang tĩnh.", "Chọn framework theo độ nổi tiếng thay vì theo yêu cầu."],
      tools: ["React Router", "Next.js", "Astro", "Docker", "Fly.io / Vercel / Cloudflare"],
      resources: [["React Router — Rendering strategies", "https://reactrouter.com/start/framework/rendering"], ["Stack Overflow Developer Survey 2025 — Technology", "https://survey.stackoverflow.co/2025/technology"]]
    }
  ]
},
{
  id: "s17", track: "web", title: "Prisma và cơ sở dữ liệu cho ứng dụng",
  subtitle: "Mô hình dữ liệu, migration và truy vấn an toàn kiểu",
  weeks: "3–4 tuần",
  goal: "Thiết kế schema quan hệ cho ứng dụng, quản lý migration, truy vấn bằng Prisma Client an toàn kiểu, và tránh các lỗi hiệu năng, bảo mật phổ biến.",
  modules: [
    {
      id: "fs-db-model", title: "Thiết kế cơ sở dữ liệu cho ứng dụng", level: 2, hours: 8,
      summary: "Bảng, khoá, quan hệ 1-n và n-n, chuẩn hoá, index, ràng buộc, transaction (nối tiếp chủ đề SQL).",
      concept: "Ứng dụng (OLTP) cần schema chuẩn hoá: mỗi thực thể một bảng, khoá chính, khoá ngoại cho quan hệ, bảng trung gian cho quan hệ nhiều-nhiều. Ràng buộc (NOT NULL, UNIQUE, CHECK, khoá ngoại) để database tự bảo vệ dữ liệu thay vì chỉ tin code. Index cho cột hay dùng trong WHERE, JOIN, ORDER BY. Transaction đảm bảo nhiều thao tác cùng thành công hoặc cùng thất bại (ví dụ trừ tồn kho và tạo đơn hàng). Khác với mô hình phân tích (star schema) ở giai đoạn 3 và 12.",
      why: ["Schema sai rất khó sửa khi đã có dữ liệu thật.", "Ràng buộc ở database chặn được lỗi mà code và AI bỏ sót."],
      when: ["Trước khi viết schema Prisma cho dự án mới."],
      whenNot: ["Không chuẩn hoá quá mức cho dữ liệu đọc nhiều cần tốc độ: cân nhắc cột tính sẵn hoặc view."],
      example: { domain: "Thương mại điện tử", title: "Bán quá số lượng tồn kho", text: "Hai người mua cùng lúc sản phẩm cuối cùng; code kiểm tra tồn kho rồi mới trừ ở hai bước riêng nên cả hai đều mua được. Dùng transaction với câu lệnh cập nhật có điều kiện (stock > 0) và ràng buộc CHECK (stock >= 0) chặn triệt để." },
      code: { lang: "sql", src: `-- Ràng buộc để database tự bảo vệ dữ liệu
CREATE TABLE product (
  id     SERIAL PRIMARY KEY,
  name   TEXT NOT NULL,
  stock  INT  NOT NULL CHECK (stock >= 0)
);
-- Trừ tồn kho an toàn khi có nhiều người mua cùng lúc
UPDATE product SET stock = stock - 1 WHERE id = 42 AND stock > 0;` },
      pitfalls: ["Không có khoá ngoại và ràng buộc.", "Thiếu index cho cột lọc thường xuyên.", "Đọc rồi ghi ở hai bước không có transaction."],
      tools: ["PostgreSQL", "SQLite", "dbdiagram.io"],
      resources: [["PostgreSQL Tutorial", "https://www.postgresql.org/docs/current/tutorial.html"], ["Use The Index, Luke", "https://use-the-index-luke.com/"]]
    },
    {
      id: "fs-prisma-schema", title: "Prisma schema và migration", level: 2, hours: 8,
      summary: "Khai báo model và quan hệ trong schema.prisma, sinh migration SQL, seed dữ liệu; Prisma 7 bỏ engine Rust.",
      concept: "Prisma là ORM cho TypeScript: bạn khai báo model trong schema.prisma, Prisma sinh SQL migration và client có kiểu. Quy trình: sửa schema → prisma migrate dev (tạo và áp migration ở máy dev) → commit file migration → prisma migrate deploy trên production (chỉ áp migration đã có, không tạo mới, không reset dữ liệu). Luôn đọc file SQL migration trước khi áp, đặc biệt khi đổi tên hoặc xoá cột. Prisma ORM 7 (11/2025) bỏ engine Rust, chuyển sang runtime TypeScript: bundle nhỏ hơn khoảng 90% và truy vấn nhanh tới 3 lần theo Prisma; client sinh ra ngoài node_modules và cấu hình qua prisma.config.ts.",
      why: ["Schema là nguồn sự thật cho cả database và kiểu TypeScript.", "Migration có version giúp mọi môi trường giống nhau và rollback có kế hoạch."],
      when: ["Ứng dụng Node/TypeScript dùng database quan hệ."],
      whenNot: ["Truy vấn phân tích phức tạp: dùng SQL thuần hoặc TypedSQL.", "Không dùng prisma db push hoặc migrate dev trên production."],
      example: { domain: "SaaS", title: "Đổi tên cột làm mất dữ liệu", text: "Đổi tên trường fullName thành name trong schema, Prisma sinh migration xoá cột cũ và tạo cột mới vì không biết đây là đổi tên. Đọc file SQL trước khi áp và sửa thành ALTER TABLE ... RENAME COLUMN giữ được dữ liệu." },
      code: { lang: "prisma", src: `// prisma/schema.prisma
model User {
  id          String       @id @default(cuid())
  email       String       @unique
  predictions Prediction[]
  createdAt   DateTime     @default(now())
}

model Prediction {
  id        String   @id @default(cuid())
  airline   String
  stops     Int
  price     Int
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String
  createdAt DateTime @default(now())
  @@index([userId, createdAt])
}

# npx prisma migrate dev --name add_prediction   (máy dev)
# npx prisma migrate deploy                       (production, trong CI/CD)` },
      pitfalls: ["migrate dev hoặc db push trên production.", "Không đọc SQL migration trước khi áp.", "Sửa file migration đã áp ở môi trường khác."],
      tools: ["Prisma ORM 7", "Prisma Studio", "PostgreSQL"],
      resources: [["Prisma — Announcing Prisma ORM 7", "https://www.prisma.io/blog/announcing-prisma-orm-7-0-0"], ["Prisma — Migrate docs", "https://www.prisma.io/docs/orm/prisma-migrate"], ["Prisma — Upgrade to ORM 7", "https://www.prisma.io/docs/guides/upgrade-prisma-orm/v7"]]
    },
    {
      id: "fs-prisma-client", title: "Truy vấn bằng Prisma Client", level: 2, hours: 8,
      summary: "CRUD, lọc, select/include, phân trang, transaction; chỉ trả đúng trường cần thiết.",
      concept: "Prisma Client sinh ra từ schema nên mọi truy vấn có kiểu: findMany, findUnique, create, update, delete, upsert. where để lọc, select để chọn đúng trường (tránh lộ trường nhạy cảm như passwordHash), include để lấy quan hệ, orderBy và take/cursor để phân trang. $transaction gom nhiều thao tác. Tạo một instance PrismaClient dùng chung cho cả ứng dụng (không tạo mới mỗi request) và chỉ dùng ở code server.",
      why: ["Kiểu sinh tự động bắt lỗi sai tên trường ngay khi viết.", "select rõ ràng vừa nhanh hơn vừa an toàn hơn."],
      when: ["Mọi thao tác dữ liệu trong loader và action."],
      whenNot: ["Không import Prisma Client vào code chạy ở trình duyệt."],
      example: { domain: "Mạng xã hội", title: "API trả cả mật khẩu đã băm", text: "Loader trả findUnique({ where: { id } }) nguyên bản ghi user cho client, trong đó có passwordHash và email. Thêm select chỉ gồm id, name, avatar giải quyết lỗi lộ dữ liệu." },
      code: { lang: "ts", src: `// Chỉ lấy đúng trường cần, phân trang bằng cursor
const history = await db.prediction.findMany({
  where: { userId: user.id },
  select: { id: true, airline: true, price: true, createdAt: true },
  orderBy: { createdAt: "desc" },
  take: 20,
  ...(cursor && { skip: 1, cursor: { id: cursor } }),
});

// Transaction: tạo đơn và trừ tồn kho cùng thành công hoặc cùng thất bại
await db.$transaction(async (tx) => {
  const p = await tx.product.updateMany({ where: { id, stock: { gt: 0 } }, data: { stock: { decrement: 1 } } });
  if (p.count === 0) throw new Error("Hết hàng");
  await tx.order.create({ data: { productId: id, userId: user.id } });
});` },
      pitfalls: ["Trả nguyên bản ghi cho client.", "Tạo PrismaClient mới mỗi request (cạn kết nối).", "Phân trang bằng skip lớn trên bảng lớn (chậm)."],
      tools: ["Prisma Client", "Prisma Studio"],
      resources: [["Prisma — CRUD", "https://www.prisma.io/docs/orm/prisma-client/queries/crud"], ["Prisma — Transactions", "https://www.prisma.io/docs/orm/prisma-client/queries/transactions"]]
    },
    {
      id: "fs-prisma-perf", title: "Hiệu năng và an toàn: N+1, index, kết nối, raw SQL", level: 3, hours: 8,
      summary: "Tránh N+1 bằng include hoặc relationLoadStrategy, đặt index, pool kết nối, và dùng raw SQL an toàn.",
      concept: "N+1 xảy ra khi lặp qua kết quả rồi truy vấn thêm một lần cho mỗi phần tử. Cách tránh: dùng include/select lồng nhau, hoặc relationLoadStrategy: \"join\" để Prisma dùng một câu JOIN. Bật log truy vấn để thấy số câu lệnh thực tế. Index theo đúng mẫu truy vấn (@@index). Môi trường serverless dễ cạn kết nối: dùng connection pooler. Khi cần SQL thuần, dùng $queryRaw với template literal (tự tham số hoá) hoặc TypedSQL; không bao giờ ghép chuỗi vào $queryRawUnsafe.",
      why: ["N+1 là nguyên nhân phổ biến làm trang chậm dần khi dữ liệu tăng.", "Injection đứng thứ 5 trong OWASP Top 10:2025."],
      when: ["Trang danh sách có quan hệ, API có tải cao, truy vấn báo cáo."],
      whenNot: ["Không tối ưu sớm khi chưa đo: bật log và đo trước."],
      example: { domain: "Blog", title: "Trang danh sách 50 bài gọi 51 truy vấn", text: "Code lấy 50 bài viết rồi trong vòng lặp gọi findUnique tác giả cho từng bài. Log cho thấy 51 truy vấn. Chuyển sang include: { author: { select: { name: true } } } còn 1–2 truy vấn và thời gian tải giảm rõ rệt." },
      code: { lang: "ts", src: `// Sai: N+1
const posts = await db.post.findMany({ take: 50 });
for (const p of posts) p.author = await db.user.findUnique({ where: { id: p.authorId } });

// Đúng: một truy vấn có JOIN
const posts2 = await db.post.findMany({
  take: 50,
  relationLoadStrategy: "join",
  include: { author: { select: { name: true } } },
});

// Raw SQL an toàn: template literal tự tham số hoá
const rows = await db.$queryRaw\`SELECT airline, avg(price) FROM "Prediction" WHERE "userId" = \${user.id} GROUP BY airline\`;
// KHÔNG: db.$queryRawUnsafe("... WHERE userId = '" + id + "'")` },
      pitfalls: ["Truy vấn trong vòng lặp.", "$queryRawUnsafe với chuỗi ghép từ input.", "Không có index cho mẫu truy vấn chính.", "Không giới hạn take cho danh sách."],
      tools: ["Prisma query log", "EXPLAIN ANALYZE", "PgBouncer / Prisma Accelerate"],
      resources: [["Prisma — Query optimization", "https://www.prisma.io/docs/orm/prisma-client/queries/query-optimization-performance"], ["Prisma — Raw queries", "https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries"], ["OWASP — SQL Injection Prevention Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html"]]
    }
  ]
},
{
  id: "s18", track: "web", title: "Full-stack production và tích hợp AI",
  subtitle: "Bảo mật, test, deploy và đưa mô hình ML/LLM vào sản phẩm web",
  weeks: "4–5 tuần",
  goal: "Đưa ứng dụng full-stack lên production an toàn, có test và giám sát, và tích hợp mô hình ML (FastAPI) cùng tính năng LLM vào giao diện.",
  modules: [
    {
      id: "fs-security", title: "Bảo mật web theo OWASP Top 10:2025", level: 3, hours: 10,
      summary: "Kiểm soát truy cập, cấu hình, chuỗi cung ứng, injection, XSS, CSRF, secret, xử lý lỗi.",
      concept: "OWASP Top 10:2025 (bản chính thức 1/2026) gồm: A01 Broken Access Control (đã gộp cả SSRF), A02 Security Misconfiguration, A03 Software Supply Chain Failures (mới), A04 Cryptographic Failures, A05 Injection, A06 Insecure Design, A07 Authentication Failures, A08 Software or Data Integrity Failures, A09 Logging & Alerting Failures, A10 Mishandling of Exceptional Conditions (mới). Với React: tránh dangerouslySetInnerHTML với dữ liệu người dùng hoặc output LLM; React Router có bảo vệ CSRF cho form nhưng cookie phải SameSite; secret chỉ ở server (biến có tiền tố VITE_ sẽ bị đưa xuống trình duyệt); khoá phiên bản dependency và rà package mới.",
      why: ["Code do AI viết có lỗ hổng bảo mật trong 45% trường hợp theo Veracode 2025.", "Chuỗi cung ứng npm đã bị tấn công nhiều lần; một package bị chiếm quyền ảnh hưởng hàng triệu dự án."],
      when: ["Trước khi đưa bất kỳ ứng dụng nào ra Internet."],
      whenNot: ["Không tự viết cơ chế mã hoá hay xác thực khi đã có thư viện chuẩn."],
      example: { domain: "Tài chính", title: "Equifax 2017: một bản vá bị bỏ lỡ", text: "Lỗ hổng Apache Struts đã có bản vá nhưng hệ thống chưa cập nhật; kẻ tấn công lấy dữ liệu của khoảng 147 triệu người. Đây là ví dụ kinh điển của việc không quản lý dependency (nay là A03 Software Supply Chain Failures)." },
      code: { lang: "bash", src: `# Rà dependency có lỗ hổng
npm audit --omit=dev
# Chỉ cài đúng phiên bản trong lockfile (CI)
npm ci
# Kiểm tra package trước khi thêm: có thật không, ai duy trì, bao nhiêu lượt tải
npm view some-package maintainers time.modified dist-tags` },
      pitfalls: ["dangerouslySetInnerHTML với nội dung người dùng hoặc output LLM.", "Secret trong biến VITE_ hoặc trong code client.", "Cài package AI gợi ý mà không kiểm tra.", "Log chứa mật khẩu hoặc token."],
      tools: ["npm audit", "Socket", "Dependabot", "OWASP ZAP", "Content-Security-Policy"],
      resources: [["OWASP Top 10:2025", "https://owasp.org/Top10/2025/"], ["OWASP Cheat Sheet Series", "https://cheatsheetseries.owasp.org/"]]
    },
    {
      id: "fs-e2e", title: "Chiến lược test và E2E với Playwright", level: 2, hours: 8,
      summary: "Unit, integration, E2E; Playwright kiểm tra luồng quan trọng trên trình duyệt thật trong CI.",
      concept: "Kim tự tháp test: nhiều test đơn vị (hàm tính toán, kiểm tra dữ liệu), vừa phải test tích hợp (loader/action với database test), ít test E2E cho luồng quan trọng nhất (đăng ký, đăng nhập, thanh toán, dự đoán giá). Playwright điều khiển trình duyệt thật, tìm phần tử theo vai trò như Testing Library, tự chờ phần tử sẵn sàng, chụp trace khi lỗi. Chạy trong CI trên mỗi pull request với database riêng.",
      why: ["Test cho phép giao việc refactor cho AI mà vẫn biết có hỏng gì không.", "Bắt lỗi tích hợp giữa giao diện, server và database mà test đơn vị bỏ sót."],
      when: ["Luồng tạo ra doanh thu hoặc dữ liệu quan trọng."],
      whenNot: ["Không viết E2E cho mọi nút: chậm và dễ vỡ."],
      example: { domain: "Hàng không (repo)", title: "Luồng dự đoán giá vé end-to-end", text: "Test mở trang, đăng nhập, nhập chuyến 22:20 → 01:10, bấm Dự đoán, kiểm tra kết quả hiện ra và xuất hiện trong trang lịch sử: kiểm tra cùng lúc giao diện, action, API mô hình và Prisma." },
      code: { lang: "ts", src: `// tests/predict.spec.ts (Playwright)
import { test, expect } from "@playwright/test";

test("dự đoán giá và lưu lịch sử", async ({ page }) => {
  await page.goto("/predict");
  await page.getByLabel("Hãng bay").selectOption("IndiGo");
  await page.getByLabel("Giờ đi").fill("2026-10-01T22:20");
  await page.getByLabel("Giờ đến").fill("2026-10-02T01:10");
  await page.getByRole("button", { name: "Dự đoán" }).click();
  await expect(page.getByText(/Giá dự kiến/)).toBeVisible();
  await page.getByRole("link", { name: "Lịch sử" }).click();
  await expect(page.getByRole("row", { name: /IndiGo/ })).toBeVisible();
});` },
      pitfalls: ["Dùng sleep cố định thay vì chờ điều kiện.", "E2E dùng chung database với môi trường dev.", "Test phụ thuộc dữ liệu có sẵn thay vì tự tạo."],
      tools: ["Playwright", "Vitest", "GitHub Actions", "Testcontainers"],
      resources: [["Playwright docs", "https://playwright.dev/docs/intro"], ["Kent C. Dodds — The Testing Trophy", "https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications"]]
    },
    {
      id: "fs-deploy", title: "Deploy, migration và giám sát production", level: 2, hours: 8,
      summary: "Docker, biến môi trường, migrate deploy trong pipeline, log, error tracking, rollout từng phần.",
      concept: "Pipeline deploy điển hình: CI chạy lint, typecheck, test → build image → chạy prisma migrate deploy → triển khai phiên bản mới → kiểm tra health → chuyển lưu lượng. Migration phải tương thích ngược (thêm cột trước, đổi code, xoá cột sau) để rollback được. Biến môi trường kiểm tra khi khởi động. Giám sát: log có cấu trúc, error tracking (Sentry), metric độ trễ và tỉ lệ lỗi, cảnh báo. Triển khai từng phần (canary) để lỗi chỉ ảnh hưởng một phần người dùng.",
      why: ["Nhiều sự cố lớn nhất đến từ khâu triển khai, không phải từ code.", "OWASP 2025 nhấn mạnh Logging & Alerting Failures: không log thì không phát hiện được sự cố."],
      when: ["Mọi ứng dụng có người dùng thật."],
      whenNot: ["Không deploy tay bằng cách copy file lên server."],
      example: { domain: "Tài chính", title: "Knight Capital 2012: deploy lên 7 trên 8 server", text: "Mã mới được triển khai thủ công lên 7 trong 8 server; server còn lại chạy code cũ kích hoạt lại một cờ tính năng bỏ đi từ lâu. Trong khoảng 45 phút công ty lỗ khoảng 460 triệu USD. Tự động hoá deploy và kiểm tra đồng nhất môi trường là bài học cốt lõi." },
      code: { lang: "dockerfile", src: `FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate && npm run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
USER node
# Áp migration đã commit rồi khởi động server
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]` },
      pitfalls: ["Migration xoá cột cùng lúc với deploy code mới (không rollback được).", "Không có health check.", "Log không có request id để truy vết."],
      tools: ["Docker", "GitHub Actions", "Fly.io / Render / Vercel", "Sentry", "OpenTelemetry"],
      resources: [["SEC — Knight Capital Americas order (2013)", "https://www.sec.gov/litigation/admin/2013/34-70694.pdf"], ["The Twelve-Factor App", "https://12factor.net/"]]
    },
    {
      id: "fs-ai-integration", title: "Tích hợp mô hình ML và LLM vào web app", level: 3, hours: 10,
      summary: "Gọi API mô hình FastAPI từ server, stream câu trả lời LLM, kiểm tra đầu ra, giới hạn chi phí.",
      concept: "Kiến trúc thường gặp: giao diện React → action/loader của React Router (server) → dịch vụ mô hình (FastAPI của giai đoạn 11) hoặc API LLM. Gọi mô hình luôn ở server để giữ secret và kiểm soát chi phí. Với LLM: stream token về giao diện (SSE hoặc thư viện như Vercel AI SDK), kiểm tra đầu ra bằng schema (Zod) trước khi dùng, không render output LLM bằng dangerouslySetInnerHTML, đặt giới hạn token, rate limit theo người dùng, timeout và thông báo lỗi thân thiện. Ghi log đầu vào, đầu ra và chi phí để đánh giá và giám sát (giai đoạn 10–11).",
      why: ["Đây là nơi hai mảng Data/AI và Full-stack gặp nhau: mô hình chỉ có giá trị khi người dùng dùng được.", "Phần lớn sự cố AI trong sản phẩm (Air Canada, Chevrolet 1 USD) nằm ở tầng tích hợp."],
      when: ["Đưa mô hình dự đoán hoặc tính năng LLM ra cho người dùng cuối."],
      whenNot: ["Không gọi API LLM trực tiếp từ trình duyệt bằng API key."],
      example: { domain: "Hàng không (repo)", title: "Flight Fare: giao diện React Router gọi FastAPI", text: "Action của React Router kiểm tra form bằng Zod, gọi POST /predict của dịch vụ FastAPI (giai đoạn 11), lưu kết quả bằng Prisma. Thêm một tính năng LLM giải thích \"vì sao giá cao\" dựa trên SHAP của mô hình, stream câu trả lời và luôn kèm cảnh báo đây là ước lượng." },
      code: { lang: "ts", src: `// app/routes/api.explain.ts — stream giải thích từ LLM (chạy ở server)
export async function action({ request, context }: Route.ActionArgs) {
  const user = context.get(userContext);
  await rateLimit(user.id, { perMinute: 5 });                  // chặn lạm dụng và chi phí
  const { predictionId } = ExplainInput.parse(await request.json());
  const p = await db.prediction.findFirstOrThrow({ where: { id: predictionId, userId: user.id } });
  const stream = await llm.stream({
    maxTokens: 400,
    system: "Giải thích ngắn gọn bằng tiếng Việt dựa trên các yếu tố đã cho. Không bịa số liệu.",
    input: JSON.stringify({ price: p.price, shap: p.shapTop5 }),
  });
  return new Response(stream, { headers: { "Content-Type": "text/event-stream" } });
}` },
      pitfalls: ["API key LLM trong code client.", "Render output LLM dạng HTML.", "Không giới hạn token và rate limit.", "Không log để đánh giá chất lượng."],
      tools: ["FastAPI", "Vercel AI SDK", "Server-Sent Events", "Zod", "Langfuse"],
      resources: [["AI SDK docs", "https://ai-sdk.dev/docs/introduction"], ["MDN — Server-sent events", "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events"], ["OWASP Top 10 for LLM Applications 2025", "https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/"]]
    },
    {
      id: "fs-capstone", title: "Dự án: Flight Fare full-stack với React Router, Prisma và FastAPI", level: 3, hours: 24,
      summary: "Làm lại app Flask của repo thành ứng dụng full-stack có đăng nhập, lịch sử dự đoán, test và deploy.",
      concept: "Gộp mọi thứ: (1) dịch vụ mô hình FastAPI từ giai đoạn 11 (Pipeline đã sửa lỗi qua nửa đêm, đường dẫn tương đối); (2) giao diện React Router framework mode: trang dự đoán (Form + action + Zod), trang lịch sử (loader + Prisma + phân trang), trang chi tiết có stream giải thích LLM; (3) Prisma với User, Prediction, migration có version; (4) đăng nhập bằng cookie session và middleware; (5) test Vitest cho hàm tính thời lượng, Playwright cho luồng dự đoán; (6) Docker Compose cho web, model, database; CI chạy lint, typecheck, test, migrate deploy.",
      why: ["Một dự án portfolio thể hiện cả kỹ năng ML lẫn full-stack, đúng hồ sơ AI Engineer hoặc Full-stack AI.", "Mỗi lỗi của app Flask gốc có một bài học tương ứng trong lộ trình."],
      when: ["Sau khi xong giai đoạn 11 và các giai đoạn 14–17."],
      whenNot: ["Không làm tất cả trong một commit: chia nhỏ và review từng bước."],
      example: { domain: "Portfolio", title: "Kết quả mong đợi", text: "Repo chạy bằng docker compose up; README có sơ đồ kiến trúc, ảnh chụp, bảng so sánh mô hình, danh sách lỗi của app Flask gốc và cách đã sửa, và mục \"những đề xuất của AI tôi đã bác bỏ và vì sao\"." },
      code: { lang: "yaml", src: `# docker-compose.yml
services:
  db:
    image: postgres:17
    environment: { POSTGRES_PASSWORD: dev }
  model:
    build: ./model            # FastAPI + Pipeline scikit-learn
    ports: ["8000:8000"]
  web:
    build: ./web              # React Router + Prisma
    environment:
      DATABASE_URL: postgresql://postgres:dev@db:5432/postgres
      MODEL_URL: http://model:8000
      SESSION_SECRET: change-me
    ports: ["3000:3000"]
    depends_on: [db, model]` },
      pitfalls: ["Sao chép logic tính đặc trưng sang cả web và model (lặp lại lỗi lệch train-serving).", "Để AI viết toàn bộ rồi không hiểu từng phần."],
      tools: ["React Router", "Prisma", "FastAPI", "PostgreSQL", "Docker Compose", "Playwright", "GitHub Actions"],
      resources: [["React Router — Tutorials", "https://reactrouter.com/tutorials/address-book"], ["Prisma — Getting started", "https://www.prisma.io/docs/getting-started"]]
    }
  ]
}
);

/* ---------- sơ đồ ---------- */
Object.assign(window.ROADMAP_DIAGRAMS = window.ROADMAP_DIAGRAMS || {}, {
  "fs-http": [{ title: "Vòng đời một request khi gửi form đăng nhập", src: `sequenceDiagram
  participant B as Trình duyệt
  participant S as Server
  participant DB as Database
  B->>S: POST /login (email, mật khẩu)
  S->>DB: Tìm user theo email
  DB-->>S: passwordHash
  S->>S: So khớp băm mật khẩu
  S-->>B: 302 Redirect /dashboard + Set-Cookie session (HttpOnly, Secure, SameSite=Lax)
  B->>S: GET /dashboard (Cookie session)
  S-->>B: 200 HTML` }],
  "fs-react-effects": [{ title: "Có cần useEffect không?", src: `flowchart TD
  A["Bạn định viết useEffect"] --> B{"Đồng bộ với hệ thống ngoài React? (subscription, timer, thư viện DOM)"}
  B -->|Có| E["Dùng useEffect, có cleanup và đủ dependency"]:::hl
  B -->|Không| C{"Tải dữ liệu cho trang?"}
  C -->|Có| L["Dùng loader của router"]
  C -->|Không| D{"Tính từ props hoặc state?"}
  D -->|Có| R["Tính thẳng khi render"]
  D -->|Không| H["Xử lý trong event handler"]` }],
  "fs-react-state": [{ title: "Chọn chỗ đặt state", src: `flowchart LR
  S["Dữ liệu cần lưu"] --> Q{"Loại dữ liệu?"}
  Q -->|"Chỉ một component dùng"| U["useState"]
  Q -->|"Nhiều component dùng"| C["Đưa lên cha chung / Context"]
  Q -->|"Muốn chia sẻ link, nút Back"| URL["Search params trên URL"]:::hl
  Q -->|"Bản sao dữ liệu server"| L["Loader + revalidation (hoặc TanStack Query)"]:::hl` }],
  "fs-rr-routing": [{ title: "Remix, React Router và Remix 3", src: `flowchart LR
  R2["Remix v2"] -->|"11/2024 gộp vào"| RR7["React Router v7 framework mode"]
  RR6["React Router v6"] --> RR7
  RR7 -->|"6/2026"| RR8["React Router v8 (middleware mặc định, ESM-only)"]:::hl
  R3["Remix 3 (bỏ React, beta)"]
  R2 -.->|"không có đường nâng cấp"| R3` }],
  "fs-rr-data": [{ title: "Luồng loader và action khi gửi form", src: `sequenceDiagram
  participant U as Người dùng
  participant UI as Component (Form)
  participant A as action (server)
  participant M as FastAPI model
  participant DB as Prisma / DB
  participant L as loader (server)
  U->>UI: Bấm Dự đoán
  UI->>A: POST formData
  A->>A: Zod kiểm tra dữ liệu
  A->>M: POST /predict
  M-->>A: price
  A->>DB: prediction.create
  A-->>UI: actionData { price }
  Note over UI,L: Router tự làm mới dữ liệu (revalidation)
  UI->>L: gọi lại loader của trang
  L->>DB: findMany lịch sử
  DB-->>L: 20 dòng mới nhất
  L-->>UI: loaderData` }],
  "fs-rr-auth": [{ title: "Bảo vệ route: vì sao dùng middleware thay vì loader cha", src: `sequenceDiagram
  participant B as Trình duyệt
  participant MW as Middleware
  participant LP as Loader cha
  participant LC as Loader con
  B->>MW: GET /dashboard/invoices/42
  alt Chưa đăng nhập
    MW-->>B: Redirect /login (không loader nào chạy)
  else Đã đăng nhập
    MW->>LP: next()
    par Loader chạy song song
      LP->>LP: Tải layout
    and
      LC->>LC: findFirst where id=42 AND ownerId=user.id
    end
    LC-->>B: Dữ liệu chỉ của chủ sở hữu
  end` }],
  "fs-prisma-schema": [{ title: "Quy trình migration an toàn", src: `flowchart LR
  A["Sửa schema.prisma"] --> B["prisma migrate dev (máy dev)"]
  B --> C["Đọc file SQL migration"]:::hl
  C --> D["Commit migration + code"]
  D --> E["CI: test trên DB tạm"]
  E --> F["prisma migrate deploy (production)"]
  F --> G["Deploy code mới"]` }],
  "fs-prisma-perf": [{ title: "N+1 và cách sửa", src: `flowchart TD
  A["findMany 50 bài"] --> B["Vòng lặp: findUnique tác giả x 50"]
  B --> C["51 truy vấn, chậm dần theo dữ liệu"]
  A2["findMany 50 bài + include author, relationLoadStrategy join"]:::hl --> D["1 truy vấn JOIN"]` }],
  "fs-deploy": [{ title: "Pipeline deploy có migration tương thích ngược", src: `flowchart LR
  PR["Pull request"] --> CI["CI: lint, typecheck, test, E2E"]
  CI --> IMG["Build Docker image"]
  IMG --> MIG["prisma migrate deploy (chỉ thêm, không xoá)"]
  MIG --> CAN["Canary 5%"]
  CAN -->|"Lỗi tăng"| RB["Rollback code"]
  CAN -->|"Ổn định"| ALL["100% lưu lượng"]:::hl
  ALL --> CLEAN["Lần deploy sau mới xoá cột cũ"]` }],
  "fs-ai-integration": [{ title: "Kiến trúc Flight Fare full-stack có LLM", src: `sequenceDiagram
  participant U as Người dùng
  participant W as React Router (server)
  participant M as FastAPI model
  participant DB as Prisma / Postgres
  participant LLM as LLM API
  U->>W: Gửi form dự đoán
  W->>M: POST /predict
  M-->>W: price, shap top 5
  W->>DB: Lưu prediction
  W-->>U: Giá dự kiến
  U->>W: Bấm "Vì sao giá cao?"
  W->>W: Kiểm tra quyền, rate limit
  W->>LLM: Prompt kèm shap, max_tokens
  LLM-->>W: Stream token
  W-->>U: Stream văn bản (hiển thị dạng text, không phải HTML)` }],
  "fs-capstone": [{ title: "Kiến trúc dự án cuối", src: `flowchart LR
  U["Trình duyệt"] --> W["web: React Router + Prisma"]:::hl
  W --> DB[("PostgreSQL")]
  W --> M["model: FastAPI + Pipeline"]
  W --> L["LLM API"]
  CI["GitHub Actions: test, migrate deploy"] --> W
  W --> O["Sentry + log"]` }]
});

/* ---------- làm việc với AI ---------- */
Object.assign(window.ROADMAP_AI = window.ROADMAP_AI || {}, {
  "fs-http": { p: "Giải thích từng header trong response này (dán response), cookie session có an toàn không (HttpOnly, Secure, SameSite), và request này có nên là GET hay POST.", flags: ["Đề xuất Access-Control-Allow-Origin: * cho API dùng cookie.", "Dùng GET cho thao tác thay đổi dữ liệu."], ask: ["Nếu trang bị chèn script lạ, cookie này có bị đọc không?"], check: ["Xem tab Network, kiểm tra thuộc tính cookie."], decide: ["Chính sách cookie và CORS của hệ thống."] },
  "fs-html-css": { p: "Viết form đăng ký bằng HTML ngữ nghĩa: label gắn id, autocomplete, thông báo lỗi có role=alert, dùng được bằng bàn phím. Liệt kê cách tôi kiểm tra accessibility bằng Lighthouse và axe.", flags: ["div onClick thay cho button.", "Input không có label.", "Tắt outline focus."], ask: ["Người dùng chỉ dùng bàn phím có gửi được form này không?"], check: ["Tab qua toàn bộ trang; chạy axe DevTools."], decide: ["Mức tuân thủ WCAG của sản phẩm."] },
  "fs-js": { p: "Hàm tìm kiếm này đôi khi hiện kết quả của lần gõ trước. Giải thích nguyên nhân theo event loop và sửa bằng AbortController, kèm test.", flags: ["Không kiểm tra res.ok.", "Quên await.", "Sửa trực tiếp mảng dùng làm state."], ask: ["Điều gì xảy ra nếu hai request trả về ngược thứ tự?"], check: ["Giả lập mạng chậm trong DevTools."], decide: ["Chiến lược xử lý lỗi mạng cho người dùng."] },
  "fs-ts": { p: "Viết schema Zod cho form dự đoán giá vé (airline, stops 0–4, depTime, arrivalTime sau depTime hoặc hôm sau) và suy ra kiểu TypeScript từ schema. Không dùng any hay as.", flags: ["Dùng any hoặc as để tắt lỗi.", "Tin kiểu TypeScript thay cho kiểm tra dữ liệu lúc chạy."], ask: ["Dữ liệu từ form đi qua đâu trước khi được tin?"], check: ["tsc --noEmit với strict: true."], decide: ["Mức strict của dự án."] },
  "fs-react-core": { p: "Chia màn hình danh sách chuyến bay thành component, chỉ rõ state nằm ở đâu và vì sao, key dùng trường nào. Không dùng thư viện state toàn cục.", flags: ["Dùng index làm key.", "Sửa state trực tiếp.", "Sao chép props vào state."], ask: ["Nếu hai component cần cùng dữ liệu, nguồn sự thật nằm ở đâu?"], check: ["React DevTools: xem component nào render lại."], decide: ["Cách chia component theo nghiệp vụ."] },
  "fs-react-effects": { p: "Rà các useEffect trong file này. Với mỗi effect, cho biết có cần không theo hướng dẫn \"You Might Not Need an Effect\" và đề xuất cách thay thế.", flags: ["useEffect để fetch dữ liệu trang khi đã có loader.", "useEffect để tính state suy ra.", "Tắt cảnh báo exhaustive-deps."], ask: ["Effect này đồng bộ với hệ thống bên ngoài nào?"], check: ["Bật StrictMode, xem effect chạy hai lần có gây lỗi không."], decide: ["Quy ước dùng effect của đội."] },
  "fs-react-state": { p: "Màn hình có bộ lọc, phân trang và danh sách sản phẩm từ server. Phân loại từng dữ liệu (state cục bộ, URL, dữ liệu server) và đề xuất chỗ đặt, không thêm thư viện nếu không cần.", flags: ["Đề xuất Redux cho mọi thứ.", "Bộ lọc không nằm trên URL.", "Chép dữ liệu server vào store rồi đồng bộ tay."], ask: ["Người dùng gửi link cho người khác thì có giữ bộ lọc không?"], check: ["Tải lại trang và bấm Back, xem trạng thái có đúng không."], decide: ["Có thêm thư viện state hay không."] },
  "fs-react19": { p: "Chuyển form đăng ký này sang dùng useActionState và useOptimistic của React 19. Nêu rõ phần nào chạy ở client, phần nào ở server, và framework của tôi (React Router v8) hỗ trợ đến đâu.", flags: ["Dùng API của Next.js Server Actions trong dự án React Router.", "Đưa secret vào component chạy ở client."], ask: ["Đoạn code này chạy ở đâu: server hay trình duyệt?"], check: ["Tìm secret trong bundle client sau khi build."], decide: ["Có áp dụng tính năng mới trong dự án hiện tại không."] },
  "fs-react-test": { p: "Viết test Vitest + Testing Library cho form dự đoán giá: tìm phần tử theo vai trò và nhãn, kiểm tra thời lượng chuyến qua nửa đêm, mock API bằng MSW. Không test state nội bộ.", flags: ["getByTestId cho mọi thứ.", "Snapshot toàn trang.", "Mock từng hàm nội bộ."], ask: ["Test này có thất bại khi logic sai không, hay chỉ khi đổi tên class?"], check: ["Cố ý làm sai logic, test phải đỏ."], decide: ["Luồng nào bắt buộc có test."] },
  "fs-rr-routing": { p: "Tôi dùng React Router v8 framework mode. Viết app/routes.ts cho trang chủ, layout dashboard với hai route con. Không dùng API của Remix v2 (@remix-run/*) hay react-router-dom.", flags: ["Import từ @remix-run/* hoặc react-router-dom.", "Làm theo tutorial Remix cũ.", "Nhầm Remix 3 với Remix v2."], ask: ["API này có trong tài liệu React Router v8 không?"], check: ["Đối chiếu reactrouter.com; chạy typecheck."], decide: ["Phiên bản framework và lịch nâng cấp."] },
  "fs-rr-data": { p: "Viết route dự đoán giá vé bằng React Router v8: action nhận form, kiểm tra bằng Zod, gọi MODEL_URL/predict, lưu bằng Prisma, trả lỗi theo trường; component dùng Form và useNavigation. Không dùng useEffect để fetch.", flags: ["Fetch trong useEffect.", "Không kiểm tra dữ liệu trong action.", "Trả nguyên bản ghi database cho client."], ask: ["Sau khi action chạy xong, dữ liệu trang lịch sử được làm mới thế nào?"], check: ["Tắt JavaScript, form vẫn gửi được không."], decide: ["Dữ liệu nào được trả cho client."] },
  "fs-rr-ux": { p: "Thêm pending UI, streaming cho phần giá dự đoán chậm, và ErrorBoundary cho route chi tiết chuyến bay. ErrorBoundary không được lộ thông tin lỗi nội bộ.", flags: ["Hiện stack trace cho người dùng.", "Không có ErrorBoundary.", "Optimistic UI cho thanh toán."], ask: ["Khi dịch vụ mô hình lỗi, phần nào của trang vẫn dùng được?"], check: ["Tắt dịch vụ mô hình và xem trang hiển thị gì."], decide: ["Thao tác nào được phép cập nhật lạc quan."] },
  "fs-rr-auth": { p: "Thiết kế đăng nhập bằng cookie session cho React Router v8: middleware bảo vệ nhánh /dashboard, mọi truy vấn lọc theo ownerId, mật khẩu băm argon2. Giải thích vì sao không dựa vào redirect ở loader cha.", flags: ["Chỉ ẩn nút ở giao diện.", "Token trong localStorage.", "Truy vấn theo id không lọc chủ sở hữu.", "Bảo vệ route bằng loader cha."], ask: ["Người dùng đổi id trên URL thì thấy được gì?"], check: ["Test đăng nhập user A, truy cập tài nguyên của user B phải nhận 404."], decide: ["Tự làm hay dùng dịch vụ xác thực."] },
  "fs-rr-render": { p: "Ứng dụng của tôi có trang giới thiệu, trang giá và dashboard cá nhân. Đề xuất cách render cho từng trang (SSR, SPA, pre-render) và nơi deploy, kèm đánh đổi về chi phí và tốc độ.", flags: ["SSR mọi trang.", "Đề xuất đổi framework mà không nêu lý do cụ thể."], ask: ["Chi phí server thay đổi thế nào nếu pre-render các trang tĩnh?"], check: ["Đo thời gian tải bằng Lighthouse trước và sau."], decide: ["Framework và nơi deploy."] },
  "fs-db-model": { p: "Thiết kế schema cho ứng dụng đặt vé: User, Flight, Booking, Payment. Chỉ rõ khoá, ràng buộc, index, và thao tác nào cần transaction.", flags: ["Không có khoá ngoại và ràng buộc.", "Đọc rồi ghi ở hai bước không có transaction."], ask: ["Hai người đặt cùng ghế cuối cùng thì chuyện gì xảy ra?"], check: ["Viết test đồng thời hai request."], decide: ["Mức chuẩn hoá và chiến lược index."] },
  "fs-prisma-schema": { p: "Thêm model Prediction vào schema.prisma, quan hệ với User, index theo userId và createdAt. Sinh migration và giải thích file SQL được tạo. Tôi dùng Prisma ORM 7.", flags: ["migrate dev hoặc db push trên production.", "Không đọc SQL migration.", "Dùng cú pháp cấu hình của Prisma cũ."], ask: ["Migration này có xoá hoặc đổi kiểu cột nào có dữ liệu không?"], check: ["Đọc file migration.sql; áp thử trên bản sao dữ liệu."], decide: ["Chiến lược migration tương thích ngược."] },
  "fs-prisma-client": { p: "Viết truy vấn Prisma lấy 20 dự đoán mới nhất của người dùng hiện tại, chỉ chọn các trường cần hiển thị, phân trang bằng cursor. Đảm bảo không trả trường nhạy cảm.", flags: ["Trả nguyên bản ghi.", "Tạo PrismaClient mới mỗi request.", "Phân trang bằng skip lớn."], ask: ["Response gửi về client chứa những trường nào?"], check: ["Xem response thật trong tab Network."], decide: ["Trường nào được phép rời khỏi server."] },
  "fs-prisma-perf": { p: "Bật log truy vấn Prisma cho trang danh sách này, đếm số truy vấn, tìm N+1 và sửa bằng include hoặc relationLoadStrategy. Nếu cần SQL thuần, dùng $queryRaw dạng template.", flags: ["Truy vấn trong vòng lặp.", "$queryRawUnsafe với chuỗi ghép từ input.", "Tối ưu khi chưa đo."], ask: ["Trang này chạy bao nhiêu câu SQL mỗi lần tải?"], check: ["Log truy vấn trước và sau; EXPLAIN ANALYZE."], decide: ["Chấp nhận độ trễ bao nhiêu cho trang này."] },
  "fs-security": { p: "Rà ứng dụng React Router + Prisma này theo OWASP Top 10:2025. Với mỗi hạng mục, chỉ ra chỗ có rủi ro trong code (dán code) và cách sửa cụ thể.", flags: ["dangerouslySetInnerHTML với dữ liệu người dùng.", "Secret trong biến VITE_.", "Cài package AI gợi ý mà không kiểm tra.", "Log chứa token."], ask: ["Package này có thật không, ai duy trì, cập nhật khi nào?"], check: ["npm audit; tìm secret trong bundle client; thử IDOR."], decide: ["Mức rủi ro chấp nhận trước khi ra mắt."] },
  "fs-e2e": { p: "Viết test Playwright cho luồng đăng nhập và dự đoán giá: tìm phần tử theo vai trò, không dùng sleep, tự tạo dữ liệu test, chạy được trong GitHub Actions với database riêng.", flags: ["sleep cố định.", "Dùng chung database dev.", "Phụ thuộc dữ liệu có sẵn."], ask: ["Test này có chạy ổn định 10 lần liên tiếp không?"], check: ["Chạy lặp 10 lần; xem trace khi lỗi."], decide: ["Luồng nào bắt buộc có E2E."] },
  "fs-deploy": { p: "Viết pipeline GitHub Actions: lint, typecheck, test, build Docker, prisma migrate deploy, deploy canary, health check. Migration phải tương thích ngược để rollback được.", flags: ["Xoá cột cùng lúc deploy code mới.", "Không có health check.", "Deploy tay."], ask: ["Nếu phải rollback code, database có còn tương thích không?"], check: ["Diễn tập rollback trên môi trường staging."], decide: ["Chiến lược rollout và ai được duyệt deploy."] },
  "fs-ai-integration": { p: "Thêm tính năng giải thích giá vé bằng LLM: gọi ở server, kiểm tra quyền, rate limit 5 lần/phút, max_tokens 400, stream về giao diện và hiển thị dạng text. Ghi log đầu vào, đầu ra và chi phí.", flags: ["API key LLM ở client.", "Render output LLM dạng HTML.", "Không giới hạn token hay rate limit."], ask: ["Người dùng có thể chèn chỉ dẫn gì qua dữ liệu đầu vào?"], check: ["Thử prompt injection; xem chi phí sau 100 lần gọi."], decide: ["Ngân sách chi phí và nội dung được phép trả lời."] },
  "fs-capstone": { p: "Lập kế hoạch làm lại app Flask Flight Fare thành React Router + Prisma + FastAPI trong 10 commit nhỏ, mỗi commit có mục tiêu, file thay đổi và cách kiểm tra. Tôi sẽ review từng commit.", flags: ["Một commit khổng lồ.", "Sao chép logic đặc trưng sang cả web và model."], ask: ["Logic tính đặc trưng nằm ở đâu duy nhất?"], check: ["Mỗi commit chạy được và có test."], decide: ["Phạm vi dự án và thứ tự ưu tiên."] }
});

/* ---------- case thực tế ---------- */
Object.assign(window.ROADMAP_APPS = window.ROADMAP_APPS || {}, {
  "fs-html-css": [{ org: "WebAIM Million", ind: "Công nghệ", kind: "fail", title: "Phần lớn trang chủ phổ biến có lỗi accessibility", text: "WebAIM quét 1 triệu trang chủ phổ biến mỗi năm bằng công cụ tự động. Lỗi hay gặp nhất: tương phản chữ thấp, ảnh thiếu alt, input thiếu label, link rỗng.", result: "Khoảng 95% trang chủ có lỗi WCAG phát hiện được tự động (các năm gần đây).", lesson: "Dùng HTML ngữ nghĩa và kiểm tra tự động ngay từ đầu rẻ hơn nhiều so với sửa sau.", src: ["WebAIM — The WebAIM Million", "https://webaim.org/projects/million/"] }],
  "fs-ts": [{ org: "Nghiên cứu ICSE 2017", ind: "Phần mềm", kind: "win", title: "Kiểu tĩnh bắt được lỗi thật", text: "Nhóm nghiên cứu lấy các lỗi đã được sửa trong dự án JavaScript công khai và kiểm tra xem TypeScript hoặc Flow có phát hiện được nếu có kiểu không.", result: "Khoảng 15% lỗi có thể được phát hiện bởi hệ thống kiểu tĩnh.", src: ["Gao, Bird, Barr — To Type or Not to Type", "https://earlbarr.com/publications/typestudy.pdf"] }],
  "fs-react-core": [{ org: "Stack Overflow Survey 2025", ind: "Phần mềm", kind: "win", title: "React là thư viện web phổ biến nhất", text: "Khảo sát khoảng 49.000 lập trình viên về công nghệ web đang dùng.", result: "React 44,7%, Next.js 20,8%, Angular 18,2%, Vue.js 17,6%.", src: ["Stack Overflow Developer Survey 2025 — Technology", "https://survey.stackoverflow.co/2025/technology"] }],
  "fs-rr-routing": [
    { org: "Remix / React Router", ind: "Phần mềm", kind: "win", title: "Remix gộp vào React Router v7", text: "Tháng 11/2024, bundler và runtime server của Remix chuyển vào React Router thành framework mode; loader, action và route lồng nhau tiếp tục ở đó.", result: "React Router v8 (6/2026) là bản hiện hành; Remix v2 và React Router v6 đã hết hỗ trợ.", src: ["Remix — Merging Remix and React Router", "https://remix.run/blog/merging-remix-and-react-router"] },
    { org: "Shopify Hydrogen", ind: "Thương mại điện tử", kind: "win", title: "Storefront chuyển sang React Router 7", text: "Framework headless commerce của Shopify chuyển từ Remix v2 sang React Router 7 cuối 2024.", result: "Theo một agency thử trên 3 cửa hàng, codemod xử lý khoảng 85% việc đổi import (vendor/blog).", src: ["Weaverse — Shopify Hydrogen 2026 guide", "https://weaverse.io/blogs/shopify-hydrogen"] }
  ],
  "fs-prisma-schema": [
    { org: "Prisma", ind: "Phần mềm", kind: "win", title: "Prisma ORM 7 bỏ engine Rust", text: "Prisma thay engine truy vấn viết bằng Rust bằng runtime TypeScript vì lớp giao tiếp giữa Rust và JavaScript là nút thắt.", result: "Theo Prisma: truy vấn nhanh tới 3 lần, bundle nhỏ hơn khoảng 90%, kiểm tra kiểu nhanh hơn 70% (vendor).", src: ["Prisma — Announcing Prisma ORM 7", "https://www.prisma.io/blog/announcing-prisma-orm-7-0-0"] },
    { org: "GitLab", ind: "Phần mềm", kind: "fail", title: "Xoá nhầm database production (2017)", text: "Kỹ sư chạy lệnh xoá thư mục dữ liệu trên nhầm server khi đang xử lý sự cố sao chép. Năm cơ chế backup đều không hoạt động như mong đợi.", result: "Mất khoảng 6 giờ dữ liệu production.", lesson: "Migration và thao tác database phải có quy trình, backup được kiểm tra khôi phục định kỳ.", src: ["GitLab — Postmortem of database outage of January 31", "https://about.gitlab.com/blog/2017/02/10/postmortem-of-database-outage-of-january-31/"] }
  ],
  "fs-security": [
    { org: "Equifax", ind: "Tài chính", kind: "fail", title: "Không vá lỗ hổng thư viện (2017)", text: "Lỗ hổng Apache Struts đã có bản vá nhưng hệ thống chưa cập nhật.", result: "Dữ liệu của khoảng 147 triệu người bị lộ.", lesson: "Quản lý và cập nhật dependency là một phần của bảo mật (OWASP A03:2025).", src: ["US FTC — Equifax Data Breach Settlement", "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement"] },
    { org: "OWASP", ind: "Công nghệ", kind: "win", title: "OWASP Top 10:2025", text: "Bản cập nhật đầu tiên kể từ 2021, dựa trên hơn 175.000 CVE.", result: "Thêm Software Supply Chain Failures và Mishandling of Exceptional Conditions; SSRF gộp vào Broken Access Control.", src: ["OWASP Top 10:2025", "https://owasp.org/Top10/2025/"] }
  ],
  "fs-deploy": [{ org: "Knight Capital", ind: "Tài chính", kind: "fail", title: "Deploy thủ công lên 7/8 server (2012)", text: "Server còn lại chạy code cũ, kích hoạt lại một chức năng đã bỏ và gửi hàng triệu lệnh ngoài ý muốn.", result: "Lỗ khoảng 460 triệu USD trong khoảng 45 phút.", lesson: "Tự động hoá deploy, kiểm tra đồng nhất môi trường, có công tắc dừng khẩn cấp.", src: ["SEC — Knight Capital Americas order (2013)", "https://www.sec.gov/litigation/admin/2013/34-70694.pdf"] }],
  "fs-e2e": [{ org: "CrowdStrike", ind: "An ninh mạng", kind: "fail", title: "Bản cập nhật lỗi làm treo 8,5 triệu máy Windows (7/2024)", text: "Một tệp cấu hình lỗi được đẩy đồng loạt tới mọi máy, không qua triển khai từng phần.", result: "Microsoft ước tính khoảng 8,5 triệu thiết bị Windows bị ảnh hưởng.", lesson: "Test tự động và rollout từng phần (canary) cho cả cấu hình, không chỉ cho code.", src: ["Microsoft — Helping our customers through the CrowdStrike outage", "https://blogs.microsoft.com/blog/2024/07/20/helping-our-customers-through-the-crowdstrike-outage/"] }]
});

/* ---------- tình huống luyện phản biện ---------- */
(window.ROADMAP_QUIZ = window.ROADMAP_QUIZ || []).push(
  { mod: "fs-react-effects", ai: "Tải danh sách chuyến bay trong useEffect rồi setState, mảng dependency để trống.", code: "useEffect(() => { fetch('/api/flights').then(r => r.json()).then(setFlights); }, []);", ans: "fix",
    why: "Chạy được nhưng không có xử lý lỗi, không huỷ request, và trong React Router framework mode việc tải dữ liệu trang nên nằm trong loader (chạy trên server, có kiểu, tự làm mới sau action)." },
  { mod: "fs-rr-auth", ai: "Lưu JWT trong localStorage để giữ đăng nhập cho tiện.", ans: "reject",
    why: "Script độc hại (XSS) đọc được localStorage. Dùng cookie session HttpOnly, Secure, SameSite=Lax." },
  { mod: "fs-rr-auth", ai: "Kiểm tra đăng nhập ở loader của layout cha là đủ bảo vệ mọi route con.", ans: "fix",
    why: "Loader của các route lồng nhau chạy song song, redirect ở loader cha không chặn loader con. Từ React Router v8 dùng middleware; và mọi truy vấn vẫn phải lọc theo chủ sở hữu." },
  { mod: "fs-prisma-perf", ai: "Tìm kiếm theo tên bằng raw SQL cho nhanh.", code: "db.$queryRawUnsafe(`SELECT * FROM \"User\" WHERE name = '${q}'`)", ans: "reject",
    why: "Ghép chuỗi input vào SQL gây SQL injection (OWASP A05:2025). Dùng $queryRaw dạng template (tự tham số hoá) hoặc truy vấn Prisma thường." },
  { mod: "fs-prisma-schema", ai: "Trên production, chạy prisma migrate dev để áp thay đổi schema mới.", ans: "reject",
    why: "migrate dev dành cho máy dev: có thể tạo migration mới và yêu cầu reset database. Production dùng prisma migrate deploy với các migration đã commit và đã review." },
  { mod: "fs-security", ai: "Hiển thị câu trả lời của LLM bằng dangerouslySetInnerHTML để giữ định dạng in đậm.", ans: "reject",
    why: "Output LLM có thể chứa HTML/script do prompt injection, gây XSS. Hiển thị dạng text hoặc dùng trình render markdown có sanitize." },
  { mod: "fs-security", ai: "Đặt API key vào VITE_OPENAI_KEY để gọi LLM từ component.", ans: "reject",
    why: "Biến có tiền tố VITE_ được đưa vào bundle gửi xuống trình duyệt; ai cũng lấy được key. Gọi LLM ở server (action/loader) và giới hạn chi phí." },
  { mod: "fs-rr-routing", ai: "Dùng import { json } from '@remix-run/node' và useLoaderData từ react-router-dom.", ans: "fix",
    why: "Đây là API của Remix v2 và React Router v6, đều đã hết hỗ trợ. Với React Router v8 dùng gói react-router, trả object thường từ loader và dùng loaderData có kiểu." }
);

/* ---------- nhánh nghề Full-stack ---------- */
window.ROADMAP_FAMILIES = window.ROADMAP_FAMILIES || {};
window.ROADMAP_FAMILIES.web = { name: "Họ phát triển web", hint: "Thích xây sản phẩm người dùng thấy và dùng trực tiếp", track: "web" };
(window.ROADMAP_BRANCHES = window.ROADMAP_BRANCHES || []).push({
  id: "fullstack", name: "Full-stack Web (React, React Router, Prisma)", family: "web",
  question: "Người dùng có dùng được sản phẩm này nhanh, đúng, an toàn không?", deliver: "Ứng dụng web: giao diện, server, database, deploy", measure: "Tỉ lệ hoàn thành tác vụ, độ trễ, lỗi, sự cố bảo mật", neighbor: "AI Engineer, Software Engineer",
  math: 1, swe: 3, degree: "Không cần",
  vn: "Nhóm nghiên cứu không có số liệu lương riêng cho full-stack trong đợt này. Theo báo cáo ITviec (qua snippet), back-end developer có trung vị khoảng 37,8 triệu đồng/tháng; doanh nghiệp Việt 2026 tuyển người biết làm việc cùng AI.",
  summary: "Xây trọn ứng dụng web từ giao diện React, server React Router (hậu thân Remix) đến database qua Prisma, rồi đưa lên production. Kết hợp với mảng AI thành hồ sơ Full-stack AI: người đưa được mô hình tới tay người dùng.",
  daily: "Viết route với loader và action, thiết kế schema và migration, làm giao diện có accessibility, viết test, review pull request, xử lý lỗi production, tích hợp API mô hình hoặc LLM.",
  levels: [
    ["Nền (~2 tháng)", "HTTP, HTML/CSS ngữ nghĩa, JavaScript hiện đại, TypeScript + Zod, Git", "Trang tĩnh có form chuẩn đạt Lighthouse accessibility trên 90"],
    ["React (~1,5 tháng)", "Component, state, khi nào không cần useEffect, state trên URL, React 19, Testing Library", "Danh sách có bộ lọc trên URL và test hành vi"],
    ["Full-stack (~2 tháng)", "React Router v8 framework mode (loader, action, form, error boundary, middleware), Prisma 7 (schema, migration, truy vấn, N+1)", "CRUD có đăng nhập, phân quyền theo chủ sở hữu, migration có version"],
    ["Production và AI (~1,5 tháng)", "OWASP Top 10:2025, Playwright, Docker, CI/CD, Sentry, tích hợp FastAPI và stream LLM", "Flight Fare full-stack (giai đoạn 18) chạy bằng docker compose, có CI"]
  ],
  order: "Giai đoạn 2 (Python, Git) → 3 (SQL) → 14 → 15 → 16 → 17 → 18. Nếu muốn thành Full-stack AI: thêm 10 (LLM, RAG) và 11 (serving, Docker).",
  resources: [["react.dev — Learn", "https://react.dev/learn"], ["React Router — Framework mode", "https://reactrouter.com/start/framework/installation"], ["Prisma docs", "https://www.prisma.io/docs"], ["OWASP Top 10:2025", "https://owasp.org/Top10/2025/"], ["The Odin Project (miễn phí)", "https://www.theodinproject.com/"]],
  stable: ["HTTP", "HTML/CSS ngữ nghĩa", "JavaScript, TypeScript", "SQL và mô hình quan hệ", "Mẫu loader/action theo chuẩn web", "OWASP"],
  churn: ["Tên và API framework (Remix → React Router v7 → v8, Remix 3)", "Thư viện state", "Nền tảng deploy", "Thư viện UI và CSS"],
  cases: [
    ["Remix v2 gộp vào React Router v7 (11/2024); React Router v8 (6/2026) bật middleware mặc định và đánh dấu Remix v2 hết hỗ trợ: ví dụ điển hình về tốc độ đổi tên và API trong web.", "https://www.infoq.com/news/2026/08/react-route-v8/"],
    ["React được 44,7% người tham gia khảo sát Stack Overflow 2025 sử dụng, Next.js 20,8%.", "https://survey.stackoverflow.co/2025/technology"],
    ["Prisma ORM 7 (11/2025) bỏ engine Rust: truy vấn nhanh tới 3 lần, bundle nhỏ hơn khoảng 90% (vendor).", "https://www.prisma.io/blog/announcing-prisma-orm-7-0-0"],
    ["Knight Capital lỗ khoảng 460 triệu USD trong 45 phút vì deploy thủ công lên 7/8 server (2012).", "https://www.sec.gov/litigation/admin/2013/34-70694.pdf"]
  ],
  critique: [
    ["Import từ @remix-run/* hoặc react-router-dom trên dự án React Router v8", "Đối chiếu tài liệu reactrouter.com; typecheck"],
    ["Fetch trong useEffect thay vì loader; useEffect cho state suy ra", "Hướng dẫn \"You Might Not Need an Effect\""],
    ["Chỉ ẩn nút ở giao diện, không kiểm tra quyền ở server; truy vấn theo id không lọc chủ sở hữu", "OWASP A01; test user A truy cập tài nguyên user B"],
    ["Token trong localStorage; bảo vệ route bằng loader cha", "Cookie HttpOnly; middleware (v8)"],
    ["$queryRawUnsafe ghép chuỗi; N+1 trong vòng lặp", "OWASP A05; bật log truy vấn Prisma"],
    ["prisma migrate dev trên production; migration xoá cột cùng lúc deploy", "migrate deploy; migration tương thích ngược"],
    ["Secret trong biến VITE_; API key LLM ở client; render output LLM bằng dangerouslySetInnerHTML", "Tìm secret trong bundle; render dạng text"],
    ["Cài package AI gợi ý mà không kiểm tra", "OWASP A03; xem npm, người duy trì, lượt tải"]
  ],
  core: ["python-core", "git-env", "sql", "fs-http", "fs-html-css", "fs-js", "fs-ts", "fs-react-core", "fs-react-effects", "fs-react-state", "fs-react-test", "fs-rr-routing", "fs-rr-data", "fs-rr-ux", "fs-rr-auth", "fs-rr-render", "fs-db-model", "fs-prisma-schema", "fs-prisma-client", "fs-prisma-perf", "fs-security", "fs-e2e", "fs-deploy", "docker"],
  useful: ["fs-react19", "fs-ai-integration", "fs-capstone", "llm-prompting", "rag", "serving-api", "pipelines-cicd", "monitoring"]
});
(function () {
  const aie = (window.ROADMAP_BRANCHES || []).find(b => b.id === "aie");
  if (aie) aie.useful.push("fs-rr-data", "fs-ai-integration", "fs-security", "fs-capstone");
  const mle = (window.ROADMAP_BRANCHES || []).find(b => b.id === "mle");
  if (mle) mle.useful.push("fs-ai-integration");
})();

/* ---------- sơ đồ tổng quan, bản đồ nhánh ---------- */
if (window.ROADMAP_OVERVIEW) window.ROADMAP_OVERVIEW.src += `
  S2 --> S14["14 · Nền tảng Web"]
  S14 --> S15["15 · React"]
  S15 --> S16["16 · React Router (Remix)"]
  S3 --> S17["17 · Prisma và DB"]
  S16 --> S18["18 · Full-stack và AI"]:::hl
  S17 --> S18
  S11 --> S18`;
if (window.ROADMAP_BRANCH_MAP) window.ROADMAP_BRANCH_MAP.src += `
  F --> W["Họ phát triển web"]
  W --> FS["Full-stack Web"]`;
(window.ROADMAP_GUIDE = window.ROADMAP_GUIDE || []).push(
  ["Đưa mô hình hoặc tính năng LLM tới người dùng qua web", "React Router + Prisma + FastAPI", "fs-ai-integration"],
  ["Ứng dụng web có form, đăng nhập, database", "React Router framework mode + Prisma", "fs-rr-data"]
);
