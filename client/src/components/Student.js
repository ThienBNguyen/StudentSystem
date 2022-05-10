import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function Student() {
	const [ name, setName ] = useState('');
	const [ address, setAddress ] = useState('');
	const [ students, setStudents ] = useState([]);
	const handleClick = (e) => {
		e.preventDefault();
		const student = { name, address };
		fetch('http://localhost:8000/student/add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(student)
		}).then(() => {
			console.log('new Student added');
		});
	};
	useEffect(() => {
		fetch('http://localhost:8000/student/getall').then((res) => res.json()).then((result) => {
			setStudents(result);
		});
		console.log(students);
	}, []);
	const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
	return (
		<Container>
			<Paper elevation={3} style={paperStyle}>
				<h1 style={{ color: 'blue' }}>
					<u>Add Student</u>{' '}
				</h1>
				<Box
					component="form"
					sx={{
						'& > :not(style)': { m: 1 }
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="standard-basic"
						label="name"
						variant="standard"
						fullWidth
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						id="standard-basic"
						label="address"
						variant="standard"
						fullWidth
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<Button variant="contained" onClick={handleClick}>
						Submit
					</Button>
				</Box>
			</Paper>
			<h1>Students</h1>
			<Paper elevation={3} style={paperStyle}>
				{students.map((student) => (
					<Paper
						elevation={6}
						style={{ margin: '10px', padding: '15px', textAlign: 'left' }}
						key={student.id}
					>
						id:{student.id} <br />
						name:{student.name}
						<br />
						address:{student.address}
						<br />
					</Paper>
				))}
			</Paper>
		</Container>
	);
}
