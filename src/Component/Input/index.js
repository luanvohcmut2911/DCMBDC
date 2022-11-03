import {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';


export const FormData = () => {
    let saveSubject = []; // for saving TENDONVI, avoid duplicating
    const [majorSelected, setMajorSelected] = useState('');
    const [subjectData, setSubjectData] = useState([]);
    const [majorData, setMajorData] = useState([]);
    const handleInMajor = () =>{
        if(document.getElementById('majorOption').value === 'Open this select menu') {
            setMajorSelected('');
            alert ('Chọn khoa trước');
        }
        else{
            setMajorSelected(document.getElementById('majorOption').value);
        }
    }
    const handleReset = (e)=>{
        e.preventDefault();
        document.getElementById('majorOption').value='Open this select menu';
        document.getElementById('inMajorOption').value='Open this select menu';
        document.getElementById('subjectOption').value='Open this select menu';
        document.getElementById('grade').value='';
    }
    const handleSubmit = (e)=>{
        e.preventDefault();  
        console.log(document.getElementById('majorOption').value);
        console.log(document.getElementById('inMajorOption').value);
        console.log(document.getElementById('subjectOption').value);
        console.log(document.getElementById('grade').value);
    }
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
                <Form.Select aria-label="Default select example" id='majorOption'>
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
                <Form.Select aria-label="Default select example" onClick={handleInMajor} id='inMajorOption'>
                    <option>Open this select menu</option>
                    {
                        majorData.length!==0 ? majorData.filter((d)=>d.MADONVI===majorSelected).map((data, index)=>{
                            return <option key={index} value = {data.MANGANH}>{data.TENCTDT} - {data.NAMAPDUNG}</option>
                            // 
                        }): 0
                    }
                </Form.Select>
            </div>
            <div className='subjectCode'>
                <label>Mã môn học</label>
                <Form.Select aria-label="Default select example"onClick={handleInMajor} id='subjectOption'>
                    <option>Open this select menu</option>
                    {
                        subjectData.length!==0 ? subjectData.filter((d)=>d.khoa===majorSelected).map((data, index)=>{
                            return <option key={index} value = {data.msmh}>{data.msmh} - {data.monhoc}</option>
                            // 
                        }): 0
                    }
                </Form.Select>
            </div>
            <div className='grade'>
                <label>Điểm tổng kết</label>
                <Form.Text aria-label="Default select example" >
                    <input type='text' placeholder='Nhập điểm tổng kết môn' id='grade'/>
                </Form.Text>
            </div>
            <div className='submitButton'>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Add 1 subject
                </Button>
                <Button variant="primary" type="submit" id='reset' onClick = {handleReset}>
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