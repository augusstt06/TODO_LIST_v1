import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function Main() {
    let now      = new Date();
    const todoId = `${now.getMonth()}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`

    const onKeyEnter = (e) => {
        if(e.key === 'Enter'){
            postData();
        }
    }

    const [todoData,setTodoData] = useState({
        content   : '',
        completed : false,
        id        : todoId
      }
    );

    const typingData = (e) =>{
      const {value, name} = e.target;

      setTodoData({
          ...todoData,
          [name] : value
      })
    };

    const [todoList, setTodoList] = useState([]);

    const postData = () => {
        axios.post(process.env.REACT_APP_TEST_API, {
            content   : todoData.content,
            completed : false,
            id        : todoData.id
        }).then(r => {
            console.log(r)
            alert('작성이 완료되었습니다!');
            window.location.reload();
        }).catch(e => console.log(e));
    };

    const getData = () => {
        axios.get(process.env.REACT_APP_TEST_API)
            .then(r => setTodoList(r.data))
            .catch(e => console.log(e));
    };

    // 함수의 매개변수로 id값을 받을수 없으니 이벤트를 이용하여 받아온다.
    const deleteTodo = (e) => {
        // button의 기본이벤트(submit)을 방지하기 위해 preventDefault를 설정한다.
        // 추가 안하고 button의 type을 지정하는 방법도 있다.
        e.preventDefault();
        console.log(e.target.value);
        axios.delete(`${process.env.REACT_APP_TEST_API}/${e.target.value}`)
            .then(r => {
                console.log(r);
                alert('삭제가 완료 되었습니다.');
                window.location.reload();
            })
            .catch(e => console.log(e));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <header>LIST</header>
            <div>
                <input placeholder = { '할 일을 입력하세요' }
                       name        = { 'content' }
                       onKeyPress  = { onKeyEnter }
                       onChange    = { typingData }
                        />
                <button onClick = { postData }>입력</button>
            </div>
            <div>
                  <br/>
                  <ul>
                      {todoList.map(data => (
                          <Link to = { `/${ data.id }` } key = { data.id }>
                              <>
                                  <li>
                                      내용 : { data.content }
                                      <br/>
                                      완료여부 : { data.completed ? '완료' : '미완료' }
                                      <br/><br/>
                                  </li>
                                  <button value = { data.id }
                                          onClick = { deleteTodo }>삭제</button>
                                  <br/><br/>
                              </>
                          </Link>
                      ))}
                  </ul>
            </div>
        </div>
  );
}

export default Main;
