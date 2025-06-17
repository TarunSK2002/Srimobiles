// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function AddDealerPage() {
//   const [name, setName] = useState('');
//   const [isActive, setIsActive] = useState(true);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('http://localhost:5000/api/dealers/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, is_active: isActive }),
//       });

//       if (res.ok) {
//         alert('Dealer added!');
//         navigate('/admin/dealers');
//       } else {
//         alert('Failed to add dealer');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       alert('Error adding dealer');
//     }
//   };

//   return (
//     <div>
//       <h2>Add Dealer</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Dealer Name:</label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//         </div>
//         <div>
//           <label>Is Active:</label>
//           <input type="checkbox" checked={isActive} onChange={() => setIsActive(prev => !prev)} />
//         </div>
//         <button type="submit">Add Dealer</button>
//       </form>
//     </div>
//   );
// }

// export default AddDealerPage;





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Switch, message } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

function AddDealerPage() {
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const res = await fetch('http://localhost:5000/api/dealers/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: values.name, is_active: values.is_active }),
      });

      if (res.ok) {
        message.success('Dealer added!');
        navigate('/admin/dealers');
      } else {
        message.error('Failed to add dealer');
      }
    } catch (err) {
      console.error('Error:', err);
      message.error('Error adding dealer');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Dealer</h2>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ name: '', is_active: true }}
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <Form.Item
          label="Dealer Name"
          name="name"
          rules={[{ required: true, message: 'Please input the dealer name!' }]}
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter dealer name"
          />
        </Form.Item>

        <Form.Item label="Is Active" name="is_active">
          <Switch
            checked={isActive}
            onChange={() => setIsActive((prev) => !prev)}
            checkedChildren="Active"
            unCheckedChildren="Inactive"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Dealer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddDealerPage;
