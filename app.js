// submit : 폼 내부에 있는 인풋 위젯에서 엔터를 입력하거나 submit 버튼을 클릭
const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');


// 삭제 버튼을 추가
// 추가한 아이템 저장
// 삭제 버튼을 누르면 저장된 데이터에서 삭제

let todos = [];

const save = () => {
  localStorage.setItem('todos', JSON.stringify(todos)) // 저장된 배열을 로컬 스토리지에 저장
}


const delItem = (event) => {
  const target = event.target.parentElement;

  todos = todos.filter((todo) => todo.id !== parseInt(target.id));
  save();
  target.remove();
};

const addItem = (todo) => {
  if (todo.text !== '') {
    const li = document.createElement('li');
    const button = document.createElement('button');
    const span = document.createElement('span');

    span.innerText = todo.text;
    button.innerText = '삭제';
    button.addEventListener('click', delItem);

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
    li.id = todo.id;
  }
};
const handler = (event) => {
  event.preventDefault();

  const todo = {
    id: Date.now(),
    text: input.value
  };

  todos.push(todo);

  addItem(todo);
  save();
  input.value = '';
};

const init = () => {
  const userTodos = JSON.parse(localStorage.getItem('todos')); // 로컬 스토리지에서 데이터 가져오기
  if (userTodos) { // 로컬 스토리지에 데이터가 있으면 동작
    userTodos.forEach((todo) => {
      addItem(todo);
    });
    todos = userTodos; // 로컬 스토리지에서 가져온 데이터를 todos에 저장
  }
};

const btnAll = document.querySelector('button.btn-clear');
btnAll.addEventListener('click', function () {
  localStorage.clear();
  window.location.reload()
});

init();
form.addEventListener('submit', handler);


// localStorage.setItem('hello', 'world'); // 로컬 스토리지에 데이터 저장
// const myData = localStorage.getItem('hello'); // 키 값,로컬 스토리지에서 데이터 가져오기
