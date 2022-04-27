import React,{useState, useEffect} from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import axios from "axios";

function Detail(){
    const urlParameter = useParams();
    const [detail, setDetail] = useState('');

    const [fix, setFix] = useState(false);
    const [todoComplete, setTodoComplete] = useState(detail.completed);

    const getDetail = () => {
        axios.get(`${process.env.REACT_APP_TEST_API}/${urlParameter.id}`)
            .then(r => {
                setDetail(r.data);
            })
    };
    useEffect(() => {
        getDetail();
    }, []);

    const handleTodoComplete = (e) => {
        setTodoComplete(!todoComplete);
        alert('완료여부를 변경하시겠습니까?');

        const {name} = e.target;

        switch (detail.completed){
            case false:
                setDetail({
                    ...detail,
                    [name] : true
                });
                break
            case true:
                setDetail({
                    ...detail,
                    [name] : false
                });
                break
            default:
                break
        }
    };
    const handleFix = () => {
        setFix(!fix);
    };

    const changeTodo = (e) => {
        const {value, name} = e.target;
        setDetail({
            ...detail,
            [name] : value
        });
    };

    // 저장되어 있는 db 수, 완료 여부 수정,
    // 아니 시발 왜 이거 404떠 개 좆같은거 씨발!
    const putTodo = () => {
        axios.put(`${process.env.REACT_APP_TEST_API}/${detail.id}`, {
            content   : detail.content,
            completed : detail.completed,
            id        : detail.id
        }).then(r => {
            console.log(r);
            alert('Todo의 수정이 완료 되었습니다.');
            window.location.reload();
        }).catch(e => console.log(e))
    }
    console.log(detail)

    // detail ==> content, completed 를 수정하여 put으로 요청
    return(
        <div>
            {fix ?
                <div>
                    <input name={'content'}
                           onChange={changeTodo}
                           defaultValue={detail.content}/>
                    <button name='completed'
                            onClick={handleTodoComplete}>
                        {detail.completed ? '완료취소' : '완료'}
                    </button>
                    <button onClick={handleFix}>취소</button>
                    <button onClick={putTodo}>수정</button>
                </div>
                :
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>할일</th>
                            <th>완료여부</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>{detail.content}</th>
                            <th>{detail.completed === true ? "완료" : '미완료'}</th>
                        </tr>
                        </tbody>
                    </table>
                    <button onClick={handleFix}>수정하기</button>
                    <Link to = {'/'}>
                        <button>메인으로</button>
                    </Link>
                </div>
            }
        </div>
    )
};
export default Detail;