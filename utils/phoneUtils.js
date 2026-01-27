/**
 * Formatea un número de teléfono al formato (xxx) xxx-xxxx
 * @param {string} phoneNumber - Número de teléfono a formatear
 * @returns {string} - Número formateado o cadena vacía si es inválido
 */
export const formatPhoneNumber = (phoneNumber) => {
	// Eliminar todos los caracteres que no sean dígitos
	const cleaned = ('' + phoneNumber).replace(/\D/g, '');
	
	// Verificar que tenga exactamente 10 dígitos
	if (cleaned.length !== 10) {
		return phoneNumber; // Retorna el valor original si no tiene 10 dígitos
	}
	
	// Formatear como (xxx) xxx-xxxx
	const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
	
	if (match) {
		return `(${match[1]}) ${match[2]}-${match[3]}`;
	}
	
	return phoneNumber;
};

/**
 * Formatea un número de teléfono en tiempo real mientras se escribe
 * @param {string} value - Valor actual del input
 * @returns {string} - Número formateado progresivamente
 */
export const formatPhoneNumberRealtime = (value) => {
	// Eliminar todos los caracteres que no sean dígitos
	const cleaned = value.replace(/\D/g, '');
	
	// Limitar a 10 dígitos
	const limited = cleaned.slice(0, 10);
	
	// Formatear progresivamente según la cantidad de dígitos
	if (limited.length <= 3) {
		return limited;
	} else if (limited.length <= 6) {
		return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
	} else {
		return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
	}
};
