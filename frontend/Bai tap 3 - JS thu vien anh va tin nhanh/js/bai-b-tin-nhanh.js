/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

const oTimKiem = document.getElementById("o-tim-kiem");
const boDem = document.getElementById("bo-dem");
const dsTin = document.getElementById("list");
const dsTheLi = dsTin.getElementsByTagName("li"); 
const theThongBaoKhongThay = document.getElementById("khong-thay");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.
function capNhatBoDem() {
    let soTinHienThi = 0;
    for (let li of dsTheLi) {
        if (!li.classList.contains("an")) {
            soTinHienThi++;
        }
    }
    boDem.textContent = `Đang hiển thị ${soTinHienThi}/${dsTheLi.length} tin`;
}
capNhatBoDem();

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
oTimKiem.addEventListener("keyup", () => {
    const tuKhoa = oTimKiem.value.trim().toLowerCase();
    let coTinKhop = false;

    for (let li of dsTheLi) {
        const h3 = li.querySelector("h3").textContent.toLowerCase();
        const p = li.querySelector("p").textContent.toLowerCase();

        if (h3.includes(tuKhoa) || p.includes(tuKhoa)) {
            li.classList.remove("an");
            coTinKhop = true;
        } else {
            li.classList.add("an");
        }
    }

    if (!coTinKhop) {
        theThongBaoKhongThay.classList.remove("an");
        theThongBaoKhongThay.textContent = `Không tìm thấy tin nào cho "${oTimKiem.value}"`;
    } else {
        theThongBaoKhongThay.classList.add("an");
    }
    capNhatBoDem();
});

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
dsTin.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON" && e.target.classList.contains("more")) {
        const theP = e.target.previousElementSibling; 
        
        if (theP.classList.contains("day-du")) {
            theP.classList.remove("day-du");
            e.target.textContent = "Read more >>";
        } else {
            theP.classList.add("day-du");
            e.target.textContent = "Thu gọn <<";
        }
    }
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
nutDang.addEventListener("click", () => {
    const titleInput = document.getElementById("o-tieu-de").value.trim();
    const contentInput = document.getElementById("o-noi-dung").value.trim();

    if (titleInput === "" || contentInput === "") {
        baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
        return; 
    }
    baoLoi.textContent = "";

    const liMoi = document.createElement("li");
    
    const spanMoi = document.createElement("span");
    spanMoi.className = "time";
    spanMoi.textContent = homNay(); 
    
    const h3Moi = document.createElement("h3");
    h3Moi.textContent = titleInput; 
    
    const pMoi = document.createElement("p");
    pMoi.textContent = contentInput; 
    
    const btnMoi = document.createElement("button");
    btnMoi.type = "button";
    btnMoi.className = "more";
    btnMoi.textContent = "Read more >>";

    liMoi.append(spanMoi, h3Moi, pMoi, btnMoi);
    dsTin.prepend(liMoi);

    document.getElementById("o-tieu-de").value = "";
    document.getElementById("o-noi-dung").value = "";

    oTimKiem.dispatchEvent(new Event("keyup")); 
});