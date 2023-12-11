"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import upArrow from "/public/up-arrow.png";
import downArrow from "/public/down-arrow.png";
import axios from "axios";

export default function Home() {
	const [selectedFile, setSelectedFile] = useState<File | null>();

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [fileDataResponse, setFileDataResponse] = useState<FileData | null>();

	interface FileData {
		CNPJ_dest: string;
		CNPJ_vend: string;
		Vendedor: string;
		destinatario: string;
		natureza_operacao: string;
		produto: string;
		quantidade: string;
		valor_total: string;
		valor_unidade: string;
	}

	const handleSubmit = async () => {
		setIsLoading(true);
		setIsError(false);
		setFileDataResponse(null);

		const formData = new FormData();
		formData.append("file", selectedFile as File);

		try {
			const { data } = await axios.post(
				"http://127.0.0.1:5000/upload",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			setFileDataResponse(data);
		} catch (error) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const onClear = () => setFileDataResponse(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setSelectedFile(event.target.files?.[0] || null);

	const [isAtBottom, setIsAtBottom] = useState(false);

	const handleScroll = () => {
		const bottom =
			Math.ceil(window.innerHeight + window.scrollY) >=
			document.documentElement.scrollHeight;
		setIsAtBottom(bottom);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleClick = () => {
		window.scrollTo({
			top: isAtBottom ? 0 : document.body.scrollHeight,
			behavior: "smooth",
		});
	};

	return (
		<div className="w-full flex flex-col md:flex-row flex-1">
			<div className="w-full md:w-1/2 px-2 min-h-screen h-full flex flex-col justify-center items-center">
				<div className="w-full flex flex-col justify-center items-center bg-white h-auto md:h-2/3 rounded-md shadow-lg px-4 py-8 md:w-4/5 md:py-32">
					<Image
						alt="Meta Logo"
						src={
							"https://scontent-gru2-1.xx.fbcdn.net/v/t39.8562-6/252294889_575082167077436_6034106545912333281_n.svg/meta-logo-primary_standardsize.svg?_nc_cat=1&ccb=1-7&_nc_sid=e280be&_nc_ohc=Pnji0z9IPgIAX_d09ao&_nc_ht=scontent-gru2-1.xx&oh=00_AfD469UbPl8576gvKqJwIjZjM3-qEefa6fQlOrFugGtMUg&oe=6551AAB9"
						}
						className="mb-8"
						width={200}
						height={200}
					/>

					<div className="flex w-full md:flex-row flex-col">
						<div className="flex flex-row w-full">
							<label className="block mr-2 text-sm font-medium text-gray-900 w-fit">
								Upload file
							</label>
							<input
								className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-50"
								id="file_input"
								accept=".xml"
								onChange={handleFileChange}
								type="file"
							/>
						</div>
						{selectedFile && (
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded ml-2 transition duration-300 ease-in-out transform mt-4 md:mt-0"
								type="submit"
								onClick={handleSubmit}
							>
								Submit
							</button>
						)}
					</div>
				</div>

				{selectedFile && (
					<div className="fixed bottom-4 right-4 md:hidden">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
							onClick={handleClick}
						>
							{isAtBottom ? (
								<Image
									src={upArrow}
									width={16}
									height={16}
									alt="up"
								/>
							) : (
								<Image
									src={downArrow}
									width={16}
									height={16}
									alt="down"
								/>
							)}
						</button>
					</div>
				)}
			</div>

			<div className="w-full md:w-1/2 px-2 min-h-screen h-auto md:h-full flex flex-col justify-center items-center">
				<div className="flex flex-1 bg-white w-full m-4 rounded-md shadow-lg p-2">
					{fileDataResponse && (
						<div className="flex flex-col flex-1 justify-between p-4">
							<div className="flex flex-col">
								<h3 className="text-2xl font-semibold mb-4">
									Invoice Details:
								</h3>
								<div className="flex flex-col">
									<div className="flex flex-col shadow-lg bg-slate-50 p-2 mb-2 rounded-lg">
										<label className="font-semibold">
											CNPJ Destinatário:
										</label>
										<span className="text-4xl font-light">
											{fileDataResponse.CNPJ_dest}
										</span>
									</div>

									<div className="flex flex-col shadow-lg bg-slate-50 p-2 mb-2 rounded-lg">
										{" "}
										<label className="font-semibold">
											CNPJ Vendedor:
										</label>
										<span className="text-4xl font-light">
											{fileDataResponse.CNPJ_vend}
										</span>
									</div>

									<div className="flex flex-col shadow-lg bg-slate-50 p-2 mb-2 rounded-lg">
										{" "}
										<label className="font-semibold">
											Vendedor:
										</label>
										<span className="text-2xl font-normal">
											{fileDataResponse.Vendedor}
										</span>
									</div>

									<div className="flex flex-col md:flex-row md:gap-4">
										<div className="flex flex-col shadow-lg bg-slate-50 p-2 mb-2 rounded-lg w-full">
											{" "}
											<label className="font-semibold">
												Destinatário:
											</label>
											<span className="text-2xl font-normal">
												{fileDataResponse.destinatario}
											</span>
										</div>

										<div className="flex flex-col shadow-lg bg-slate-50 p-2 mb-2 rounded-lg w-full">
											{" "}
											<label className="font-semibold">
												Natureza da Operação:
											</label>
											<span className="text-2xl font-normal">
												{
													fileDataResponse.natureza_operacao
												}
											</span>
										</div>
									</div>

									<div className="flex flex-col md:flex-row md:gap-4">
										<div className="flex flex-col shadow-lg bg-slate-50 p-2 mb-2 rounded-lg w-full md:w-full">
											{" "}
											<label className="font-semibold">
												Produto:
											</label>
											<span className="text-2xl font-normal">
												{fileDataResponse.produto}
											</span>
										</div>

										<div className="flex flex-col shadow-lg bg-slate-50 p-2 mb-2 rounded-lg w-full md:w-full">
											{" "}
											<label className="font-semibold">
												Quantidade:
											</label>
											<span className="text-2xl font-normal">
												{fileDataResponse.quantidade}
											</span>
										</div>
									</div>

									<div className="flex flex-col md:flex-row md:gap-4">
										<div className="flex flex-col shadow-lg bg-slate-50 p-2 mb-2 rounded-lg w-full md:w-full">
											{" "}
											<label className="font-semibold">
												Valor Total:
											</label>
											<span className="text-2xl font-normal">
												{fileDataResponse.valor_total}
											</span>
										</div>

										<div className="flex flex-col shadow-lg bg-slate-50 p-2 mb-2 rounded-lg w-full md:w-full">
											{" "}
											<label className="font-semibold">
												Valor por Unidade:
											</label>
											<span className="text-2xl font-normal">
												{fileDataResponse.valor_unidade}
											</span>
										</div>
									</div>
								</div>
							</div>

							<div className="mt-auto flex">
								<button
									className="bg-red-400 hover:bg-red-500 p-2 text-lg transition duration-300 ease-in-out transform rounded-lg text-white flex justify-center w-full"
									onClick={onClear}
								>
									Clear
								</button>
							</div>
						</div>
					)}

					{!selectedFile && !isError && !isLoading && (
						<div className="flex flex-1 justify-center items-center">
							<p className="text-gray-400 text-2xl">
								Submit your invoice to see the results
							</p>
						</div>
					)}

					{selectedFile &&
						!fileDataResponse &&
						!isError &&
						!isLoading && (
							<div className="flex flex-col flex-1 justify-center items-center">
								<p className="text-gray-400 text-2xl">
									{selectedFile.name} ({selectedFile.size}{" "}
									bytes){" "}
									{
                                        selectedFile
                                            .type
                                            .split("/")[1]
                                            .toUpperCase()
                                    }
								</p>
								<p className="text-gray-400 text-xl">
									Submit your invoice to see the results
								</p>
							</div>
						)}

					{isError && (
						<div className="flex flex-col flex-1 justify-center items-center">
							<p className="text-red-400 text-2xl">
								Something went wrong
							</p>
							<p className="text-red-400 text-xl">
								Please try again...
							</p>
						</div>
					)}

					{isLoading && (
						<div className="flex flex-1 justify-center items-center">
							<p className="text-gray-400 text-2xl">Loading...</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
