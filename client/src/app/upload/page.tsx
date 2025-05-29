"use client";
import React from "react";

type Props = {};

const UploadPage = (props: Props) => {
	const handleUpload = async (target: EventTarget & HTMLInputElement) => {
		const file = target.files![0];

		const form = new FormData();
		form.append("file", file);

		const res = await fetch("http://localhost:8000/api/v1/upload", {
			method: "POST",
			body: form,
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImVtYWlsIjoidGhhbmhnYTFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ4NTAyMDMzLCJleHAiOjE3NDg1ODg0MzN9.o6rcQEl1sFMJPNRKgYkwZ9Jgk6P0p8GBum6tn6ZdZKw`,
			},
		});

		res.json();

		console.log(res);

		return res;
	};

	return (
		<div>
			<input type="file" onChange={(e) => handleUpload(e.target)} />
		</div>
	);
};

export default UploadPage;
