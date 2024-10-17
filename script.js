// Gerekli elementleri seçiyoruz
const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const deadlineInput = document.querySelector("#txtTaskDeadline");
const priorityInput = document.querySelector("#taskPriority");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos; // Tüm görevleri tutacağımız dizi

// Görevleri yükleme ve event listener'ları ekleme işlemleri
loadItems();
eventListeners();

// Event listener'lar tanımlanıyor
function eventListeners() {
    // Görev ekleme formu gönderildiğinde
    form.addEventListener("submit", addNewItem);
    // Görev silmek için (tek tek)
    taskList.addEventListener("click", deleteItem);
    // Tüm görevleri silmek için
    btnDeleteAll.addEventListener("click", deleteAllItems);
}

// Local Storage'dan görevleri yükleyip ekrana yazdırma
function loadItems() {
    todos = getItemsFromLS(); // Local Storage'dan görevleri al
    todos.forEach(function (item) { // Her görev için ekrana item oluştur
        createItem(item.text, item.deadline, item.priority);
    });
}

// Local Storage'dan görevleri almak için
function getItemsFromLS() {
    // Eğer Local Storage'da "todos" anahtarı yoksa boş bir dizi oluştur
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        // Aksi takdirde Local Storage'daki görevleri JSON formatında al
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

// Yeni bir görev eklemek için Local Storage'a kaydet
function setItemToLS(newTodo) {
    todos = getItemsFromLS(); // Mevcut görevleri al
    todos.push(newTodo); // Yeni görevi diziye ekle
    localStorage.setItem("todos", JSON.stringify(todos)); // Güncellenen diziyi tekrar Local Storage'a kaydet
}

// Görev ekranda görüntülemek için list item (li) oluşturur
function createItem(newTodo, deadline = "", priority = "low") {
    const li = document.createElement("li"); // Yeni bir li elementi oluştur
    // Görevin önceliğine göre CSS sınıfı ekleniyor
    li.className = `list-group-item list-group-item-${priority}`;
    // Görev metnini ve detaylarını ekliyoruz
    li.appendChild(document.createTextNode(`${newTodo} - Deadline: ${deadline} - Priority: ${priority}`));

    // Silme butonu oluşturma
    const a = document.createElement("a");
    a.classList = "delete-item float-right"; // Silme butonuna CSS sınıfları ekliyoruz
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>'; // Font Awesome ikonu ile çarpı işareti ekleniyor
    li.appendChild(a); // Silme butonunu li içine ekle

    taskList.appendChild(li); // li'yi ul (taskList) içine ekle
}

// Yeni bir görev eklemek için kullanılan fonksiyon
function addNewItem(e) {
    e.preventDefault(); // Sayfanın yenilenmesini engelle

    // Eğer görev adı boş ise uyarı ver
    if (input.value === "") {
        alert("Please add a new task");
        return;
    }

    // Yeni görev nesnesi oluşturuyoruz
    const newTask = {
        text: input.value, // Görev adı
        deadline: deadlineInput.value, // Son teslim tarihi
        priority: priorityInput.value // Görev önceliği
    };

    // Görevi ekranda göster ve Local Storage'a kaydet
    createItem(newTask.text, newTask.deadline, newTask.priority);
    setItemToLS(newTask);

    // Formu sıfırla
    input.value = "";
    deadlineInput.value = "";
    priorityInput.value = "low";
}

// Tek bir görevi silmek için kullanılan fonksiyon
function deleteItem(e) {
    // Eğer tıklanan yer çarpı işareti ise (silme butonu)
    if (e.target.classList.contains("fa-times")) {
        // Kullanıcıya silme işlemi için onay soruluyor
        if (confirm("Are you sure you want to delete this task?")) {
            const taskItem = e.target.closest("li"); // Tıklanan elemanın en yakın li öğesini bul
            const taskText = taskItem.textContent.split(" - ")[0]; // Görev metnini ayır (ilk kısım görev adı)
            deleteTodoFromStorage(taskText); // Görevi Local Storage'dan sil
            taskItem.remove(); // HTML'den görevi kaldır
        }
    }
    e.preventDefault();
}

// Local Storage'dan görevi silmek için kullanılan fonksiyon
function deleteTodoFromStorage(deleteTask) {
    let todos = getItemsFromLS(); // Mevcut görevleri al
    // Silinecek görevi diziden çıkar
    todos = todos.filter(todo => todo.text !== deleteTask);
    localStorage.setItem("todos", JSON.stringify(todos)); // Güncellenen diziyi Local Storage'a kaydet
}

// Tüm görevleri toplu olarak silmek için kullanılan fonksiyon
function deleteAllItems(e) {
    // Kullanıcıya onay soruluyor
    if (confirm("Are you sure you want to delete all tasks?")) {
        // taskList'teki tüm li'leri sil
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear(); // Local Storage'ı tamamen temizle
    }
    e.preventDefault();
}
