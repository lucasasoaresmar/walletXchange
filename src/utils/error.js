export const newError = ({
	name = 'Erro', 
	message = 'Não rolou. tente de novo mais tarde'
} = {}) => ({name, message})