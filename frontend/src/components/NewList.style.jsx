import styled from "styled-components";


export const Form = styled.div`
		display: flex;
		flex-direction: column;
		width: 80%;

		.questionForm{
		
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		

		.lista_titulo{
		margin-bottom: 60px;
		background: none;
		border: none;
		font-size: 20px;
		text-align: center;

		&:focus {
		border: none;
		}
		
		
		}

		.enunciado{
		width: 100%;

		}

		.resref{
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-around;
		margin-bottom: 100px;
		}
	

		.pergunta{
				padding: 20px;
				resize: vertical; 
				box-sizing: border-box;
				background-color: #E9E8E8;
				border-radius: 30px;
				outline: none;
				width: 100%;
				height: 150px;
				border: none; 

				&:focus {
					border-color: white;
				}


				&::placeholder {
						color: #999;
				}
		}

		.alternativas{
				display:flex;
				flex-direction:column;
				margin-top: 40px;
				margin-bottom: 40px;
				width: 100%;



				& > div{
						margin-bottom: 10px;

						& > input{
								width: 40%;
								padding: 8px;
				resize: vertical; 
				box-sizing: border-box;
				background-color: #E9E8E8;
				border-radius: 30px;
				outline: none;
				border: none;


				&:focus {
						border-color: white;
				}


				&::placeholder {
						color: #999;
				}
						}
				}
		}

		.resposta{


				& > select{
						margin-left: 10px;
						background-color: #E9E8E8;
				border-radius: 30px;
				outline: none;
				font-size: 16px;
				width: 50px;
				height: 25px;
				padding-left: 8px;
				border: none;
				background-color: #D9D9D9;


				}
		}

		.tags{
				display: flex;
				width: 100%;
				justify-content: space-around;
				padding-right: 50px;
				padding-left: 50px;
				margin-bottom: 60px;

				& > div{
						& > input {
								background-color: #D5E2E5;
								border-radius: 10px;
								outline: none;
								width: 150px;
								border: none;
								height: 30px;
								padding: 8px;
								&:focus {
										border-color: white;
								}
						}
				}


		}

		.ref{
			& > input{
						margin-left: 10px;
						background-color: #E9E8E8;
				border-radius: 30px;
				outline: none;
				width: 300px;
				height: 30px;
				padding: 8px;
				border: none;
				background-color: #D9D9D9;


				}
		
		}

		.paiAddP{
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

		}

		.addPergunta{

				width: 170px;
				height: 35px;
				background-color: #D9D9D9;
				border: none;
				border-radius: 30px;
				



		}

		.finalizar{
				width: 250px;
				height: 35px;
				margin-top: 50px;
				background-color: #D5E2E5;
				border: none;
				border-radius: 30px;

		}
`;

export const Question = styled.div`

`;