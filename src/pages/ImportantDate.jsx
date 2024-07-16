import React from 'react'
import calender_icon from '../Images/calender_icon.jpg'
import { Container, Col, Row } from 'react-bootstrap'
const ImportantDate = () => {
  return (
    <Container fluid className='important-Block'>
      <Row className='important-content'>
      <Col xs={12} sm={6}><img src={calender_icon} className="cal-img"/></Col>
      <Col  xs={12} sm={6} className='text-center datalist'>
        <h4 className='heading'>Important date lists are given below</h4>
        <ul>
          <li> Class IX unit test will start on 1 Apr 2024.</li>
          <li> Class XI unit test will start on 15 Apr 2024.</li>
          <li> Class XI unit test will start on 15 Apr 2024.</li>
          <li> Class XI unit test will start on 15 Apr 2024.</li>
          <li> Class XI unit test will start on 15 Apr 2024.</li>
          <li> Class XI unit test will start on 15 Apr 2024.</li>
          <li> Class XI unit test will start on 15 Apr 2024.</li>
          <li> Class XI unit test will start on 15 Apr 2024.</li>
        </ul>
      </Col>
      </Row>
    </Container>
  )
}

export default ImportantDate