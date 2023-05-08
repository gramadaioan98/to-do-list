import React, { useEffect, useState } from "react";

import "./App.css";
import $ from "jquery";
window.jquery = window.$ = $;

const App = () => {
	const [name, setName] = useState("");
	const [edit, setEdit] = useState(0);
	const [errorMessage, setErrorMessage] = useState("");
	const [succesMessage, setSuccesMessage] = useState("");
	const [description, setDescription] = useState("");
	const [nameChange, setNameChange] = useState("");
	const [descriptionChange, setDescriptionChange] = useState("");
	const [id, setId] = useState(Math.floor(Math.random() * 1000));
	const [storedItems, setStoredItems] = useState(
		JSON.parse(localStorage.getItem("items"))
	);

	const handleAdd = () => {
		setErrorMessage("Some fields are empty");
		setTimeout(() => {
			setErrorMessage("");
		}, 2000);
	};
	const handleAddSucces = text => {
		setSuccesMessage(text);
		setTimeout(() => {
			setSuccesMessage("");
		}, 2000);
	};

	const handleAddItem = () => {
		if (name && description) {
			const newItem = { id, name, description, value: false };
			const items = storedItems ? storedItems : [];
			const updatedItems = [...items, newItem];
			localStorage.setItem("items", JSON.stringify(updatedItems));
			setStoredItems(updatedItems);
			setName("");
			setDescription("");
			setId(Math.floor(Math.random() * 1000));
			handleAddSucces("Add items whit succes!");
		} else {
			handleAdd();
		}
	};

	const handleRemoveItem = id => {
		const items = storedItems ? storedItems : [];
		localStorage.setItem(
			"items",
			JSON.stringify(items.filter(item => item.id !== id))
		);
		setStoredItems(JSON.parse(localStorage.getItem("items")));
		handleAddSucces("Item was remove!");
	};
	const handleEditItem = id => {
		setEdit(id);
		const itemToEdit = storedItems.filter(item => item.id === id);
		setNameChange(itemToEdit[0].name);
		setDescriptionChange(itemToEdit[0].description);
	};
	const handleEditSetItem = () => {
		if (nameChange && descriptionChange) {
			const items = storedItems ? storedItems : [];
			const newList = items.map((item, i) => {
				if (item.id === edit) {
					items[i].name = nameChange;
					items[i].description = descriptionChange;
				}
			});
			localStorage.setItem("items", JSON.stringify(items));
			setStoredItems(JSON.parse(localStorage.getItem("items")));
			setDescriptionChange("");
			setNameChange("");
			setEdit(0);
			handleAddSucces("The item has been edit!");
		} else {
			handleAdd();
		}
	};
	const handleCheckItem = id => {
		const items = storedItems ? storedItems : [];
		const newList = items.map((item, i) => {
			if (item.id === id) {
				items[i].value = !items[i].value;
				if (items[i].value) {
					handleAddSucces("The item has been checked!");
				} else {
					handleAddSucces("The item has not been checked!");
				}
			}
		});

		localStorage.setItem("items", JSON.stringify(items));
		setStoredItems(JSON.parse(localStorage.getItem("items")));
	};

	const displayItems = () => {
		const items = storedItems ? storedItems : [];
		return (
			<div>
				{items != 0 ? (
					<div className="max-w-[700px] mx-auto  bg-gray-300 p-5 my-20 rounded-xl shadow-2xl">
						<h2 className="font-bold text-xl text-center"> Items List</h2>
						<div className="flex flex-col my-5 bg-black text-white  max-h-[380px] overflow-auto">
							{items.map(item => (
								<div
									key={item.id}
									className="px-5 py-2 flex flex-col  sm:grid grid-cols-7 items-start gap-5 sm:items-center border-b-2 border-gray-200"
								>
									<div className="col-span-6">
										<h3 className="font-bold text-lg">{item.name}</h3>
										<p className="text-sm italic">{item.description}</p>
									</div>
									<div className="col-span-1 flex justify-end gap-1 items-center">
										<div onClick={() => handleEditItem(item.id)}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="23"
												height="23"
												fill="currentColor"
												className="cursor-pointer hover:text-red-700 hover:duration-200"
												viewBox="0 0 16 16"
											>
												<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
											</svg>
										</div>
										<div
											onClick={() => handleRemoveItem(item.id)}
											className="cursor-pointer hover:text-red-700 hover:duration-200"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="25"
												height="25"
												fill="currentColor"
												viewBox="0 0 16 16"
											>
												<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
												<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
											</svg>
										</div>
										<div onClick={() => handleCheckItem(item.id)}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="25"
												height="25"
												fill="currentColor"
												className={`${
													item.value == true ? "text-green-400" : ""
												} cursor-pointer hover:text-red-700 hover:duration-200`}
												viewBox="0 0 16 16"
											>
												<path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
												<path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
											</svg>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				) : (
					""
				)}
			</div>
		);
	};
	return (
		<div>
			<div
				className={`${
					errorMessage ? "opacity-100 visible" : "opacity-0 invisible"
				} fixed  top-10 left-1/2 -translate-x-1/2 w-full text-white duration-500 bg-red-700 bg-opacity-80 max-w-[350px] mx-auto`}
			>
				<div className="flex items-center justify-center p-5">
					{errorMessage}
				</div>
			</div>
			<div
				className={`${
					succesMessage ? "opacity-100 visible" : "opacity-0 invisible"
				} fixed  top-10 left-1/2 -translate-x-1/2 w-full text-white duration-500 bg-green-700 bg-opacity-80 max-w-[350px] mx-auto`}
			>
				<div className="flex items-center justify-center p-5">
					{succesMessage}
				</div>
			</div>

			{displayItems()}
			{edit != 0 ? (
				<div className="fixed top-0 left-0 w-full h-full  bg-white  bg-opacity-40">
					<div className="relative w-full h-full flex items-center justify-center">
						<div className="relative w-full max-w-[700px] mx-auto flex flex-col gap-5 p-10 bg-gray-100 shadow-2xl rounded-2xl">
							<div
								className="absolute right-5 top-5"
								onClick={() => {
									setEdit(0);
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="23"
									height="23"
									fill="currentColor"
									className="cursor-pointer hover:text-red-700 hover:duration-200"
									viewBox="0 0 16 16"
								>
									<path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
								</svg>
							</div>
							<p className="font-bold text-xl text-center">Edit Item</p>
							<input
								type="text"
								className="border-2 border-gray-700 px-2 py-1"
								placeholder="Name"
								value={nameChange}
								onChange={e => setNameChange(e.target.value)}
							/>
							<input
								type="text"
								className="border-2 border-gray-700 px-2 py-1"
								placeholder="Description"
								value={descriptionChange}
								onChange={e => setDescriptionChange(e.target.value)}
							/>
							<div className="flex items-center justify-center">
								<button
									onClick={handleEditSetItem}
									className="bg-black px-10 py-2 text-white font-bold rounded-xl hover:bg-green-600 duration-200"
								>
									Edit
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				""
			)}

			<div className="max-w-[700px] flex flex-col p-5 gap-5 mx-auto bg-gray-300 rounded-xl my-20  shadow-2xl">
				<h2 className="font-bold text-xl text-center">Add Item To List</h2>
				<input
					type="text"
					className="px-5 py-1 border-2 border-gray-700 rounded-lg"
					placeholder="Name"
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<input
					type="text"
					className="px-5 py-1 border-2 border-gray-700 rounded-lg"
					placeholder="Description"
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<div className="flex items-center justify-center">
					<button
						onClick={handleAddItem}
						className="bg-black px-10 py-2 text-white font-bold rounded-xl hover:bg-green-600 duration-200"
					>
						Add
					</button>
				</div>
			</div>
		</div>
	);
};

export default App;
