import styled from "styled-components";


export const Form = styled.div`
		display: flex;
		flex-direction: column;
		width: 80%;


		.pergunta{
				padding: 10px;
				resize: vertical; 
				box-sizing: border-box;
				background-color: #D9D9D9;
				border-radius: 4px;
				outline: none;
				margin-left:50px;
				width: 800px;


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
								padding: 5px;
				resize: vertical; 
				box-sizing: border-box;
				background-color: #D9D9D9;
				border-radius: 4px;
				outline: none;


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
				margin-bottom: 40px;

				& > select{
						margin-left: 10px;
						background-color: #D9D9D9;
				border-radius: 4px;
				outline: none;
				font-size: 16px;
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
								background-color: #D9D9D9;
								border-radius: 4px;
								outline: none;
								width: 150px;
								&:focus {
										border-color: white;
								}
						}
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
				height: 30px;
				background-color: #B2DAFF;
				border: none;



		}

		.finalizar{
				border: none;
				width: 200px;
				margin-top: 70px;
				height: 30px;
				background-color: #00DCBA;

		}
`;

export const Question = styled.div`

`;