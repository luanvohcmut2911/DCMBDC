import {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';


export const FormData = () => {
    const [generalData, setGeneralData] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:3000/cautrucmonhoc')
            .then(response=>response.json())
            .then(res=>{
                setGeneralData(res)
            })
    },[]);
    console.log(generalData);
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
                    <option>Open this select menu</option>
                    <option value="21">K21</option>
                    <option value="22">K22</option>
                </Form.Select>
            </div>
            <div className='major'>
                <label>Khoa/ Ngành</label>
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
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