// formタグのidの"form"を指定して値をとり、formとして定義する
const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

// JSON.parsseで文字列から配列に戻す？
const todos = JSON.parse(localStorage.getItem("todos"));

// todosが空でなかったらliタグを追加する
if (todos) {
  todos.forEach(todo => {
    add(todo);
  })
}

// ターゲット.addEventListener(イベント名, 関数); の形
form.addEventListener("submit", function (event) {
  // preventDefaultでデフォルトの挙動を発生させない(ここでは Enterを押したときのページのリロード)
  event.preventDefault();
  add();
});

function add(todo) {
  // 空でない場合のみliを生成するために、input.valueを関数に定義しif文にかける
  let todoText = input.value;
  // ローカルストレージにtodoがあったら 
  if (todo) {
    todoText = todo.text;
  }

  // todoTextをif文に入れると、空なら暗黙的型変換によりfalseが返る
  if (todoText) {
    const li = document.createElement("li");
    li.innerText = todoText;
    li.classList.add("list-group-item");

    if (todo && todo.completed) {
      li.classList.add("text-decoration-line-through");
    }

    // 右クリック("contextmenu")でイベントを発生させる
    li.addEventListener("contextmenu", function
    (event) {
      // 右クリックで普段出るあのやつを停止させる
      event.preventDefault();
      // liタグを削除
      li.remove();
      // saveDataをしてローカルストレージにも反映
      saveData();
    });

    // クリックで打消し線を表示
    li.addEventListener("click", function () {
      // toggleは後ろの()を切り替える(打消線あれば消す、なければつける)
      // "text-decoration-line-through"はブートストラップのclass
      li.classList.toggle("text-decoration-line-through");
      // ローカルストレージに保存
      saveData();
    });

    ul.appendChild(li);
    input.value = "";
    // saveDataを定義
    saveData();
  }
}

function saveData() {
  // liタグをlistsに定義して取得する
  const lists = document.querySelectorAll("li");
  // 取得したliを入れる空の配列を定義しておく
  const todos= [];
  // forEachで並べる
  lists.forEach(list => {
    // 完了(取消線)を格納する
    let todo = {
      text: list.innerText,
      completed: list.classList.contains
      ("text-decoration-line-through")
    };

    // pushで用意した配列(todos)に格納する
    todos.push(todo);
  });
  // todosをローカルストレージに保存する、同時にJSON形式に変換
  localStorage.setItem("todos", JSON.stringify(todos));
}
