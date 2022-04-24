import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function Main() {

    let now = new Date();
    const todoId = `${now.getMonth()}${now.getDate()}${now.getHours()}${now.getMinutes()}`

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
        })
    }
    const getData = () => {
        axios.get(process.env.REACT_APP_TEST_API)
            .then(r => setTodoList(r.data));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <header>LIST</header>
            <div>
                <input placeholder={'할 일을 입력하세요'}
                       name = 'content'
                    onChange={typingData}
                        />
                <button onClick={postData}>입력</button>
            </div>
            <div>
                  <br/>
                  <ul>
                      {todoList.map(data => (
                          <Link to ={`/${data.id}`} key = {data.id}>
                              <li>
                                  내용 : {data.content}
                                  <br/>
                                  완료여부 : {data.completed ? '완료' : '미완료'}
                                  <br/><br/>
                              </li>
                          </Link>
                      ))}
                  </ul>
            </div>
        </div>
  );
}

export default Main;
