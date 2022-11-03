import {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';


export const FormData = () => {
    let saveSubject = []; // for saving TENDONVI, avoid duplicating
    const [subjectData, setSubjectData] = useState([]);
    const [majorData, setMajorData] = useState([]);
    useEffect(()=>{
        const controller = new AbortController();
        const signal = controller.signal;
        fetch('http://localhost:4000/cautrucmonhoc', {signal})
            .then(response=>response.json())
            .then(res=>{
                setSubjectData(res)
            })
        fetch('http://localhost:8000/nganh', {signal})
            .then(response=>response.json())
            .then(res=>{
                setMajorData(res);
            })
    },[]);
    console.log(subjectData);
    console.log(majorData);
    return (
        <form>
            <h3>INPUT</h3>
            <span className="text-italic">
                Chương trình Kỹ sư Chất lượng Cao PFIEV và Chất lượng cao Tiếng Anh,
                tăng cường Tiếng Nhật vui lòng chọn như Hệ Đại trà
            </span>
            <br />
            <hr />
            <div className='schoolYear'>
                <label>Khóa</label>
                <Form.Select aria-label="Default select example">
                    <option value="21">K21</option>
                    <option value="22">K22</option>
                </Form.Select>
            </div>
            <div className='major'>
                <label>Khoa/ Ngành</label> {/* Khoa: majorData.TENDONVI, nganh: majorData.TENCTDT  */}
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    {
                        majorData.length!==0 ? majorData.map((data, index)=>{
                            if(!saveSubject.includes(data.TENDONVI)){
                                saveSubject.push(data.TENDONVI);
                                return <option key={index} value = {data.MADONVI}>{data.TENDONVI}</option>
                            }
                            else return 0;
                            // 
                        }): 0
                    }
                </Form.Select>
            </div>
            <div className='inMajor'>
                <label>Chuyên ngành</label>
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </div>
            <div className='subjectCode'>
                <label>Mã môn học</label>
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </div>
            <div className='grade'>
                <label>Điểm tổng kết</label>
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </div>
            <div className='submitButton'>
                <Button variant="primary" type="submit">
                    Add 1 subject
                </Button>
                <Button variant="primary" type="submit">
                    Reset
                </Button>
            </div>
            <div className='submitButton'>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </div>
        </form>
    )
}