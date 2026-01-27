
export async function enviarFormularioContacto(prevState, formData) {
    // Aquí irá la lógica de envío del formulario
    const email = formData.get("email");
    const nombre = formData.get("nombre");
    const telefono = formData.get("telefono");
    const mensaje = formData.get("mensaje");

    // Objeto con los valores del formulario
    const formValues = {
        nombre: nombre || "",
        email: email || "",
        telefono: telefono || "",
        mensaje: mensaje || ""
    };

    // Objeto para errores por campo
    let fieldErrors = {};

    // Validar cada campo individualmente
    if (!nombre || nombre.trim() === "") {
      fieldErrors.nombre = "El nombre es requerido.";
    }

    if (!email || email.trim() === "") {
      fieldErrors.email = "El email es requerido.";
    } else if (!email.includes("@")) {
      fieldErrors.email = "El email no es válido.";
    }

    if (!telefono || telefono.trim() === "") {
      fieldErrors.telefono = "El teléfono es requerido.";
    } else {
      // Limpiar el teléfono de caracteres no numéricos para validar
      const cleanedPhone = telefono.replace(/\D/g, '');
      if (cleanedPhone.length !== 10) {
        fieldErrors.telefono = "El teléfono debe tener 10 dígitos.";
      }
    }

    if (!mensaje || mensaje.trim() === "") {
      fieldErrors.mensaje = "El mensaje es requerido.";
    } else if (mensaje.length < 10) {
      fieldErrors.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    }

    // Si hay errores, retornarlos con los valores ingresados
    if (Object.keys(fieldErrors).length > 0) {
      return {
        errors: fieldErrors,
        success: null,
        values: formValues,
      };
    }

    // Si todo está bien, procesar el formulario y limpiar los campos
    return {
      errors: null,
      success: "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.",
      values: { nombre: "", email: "", telefono: "", mensaje: "" },
    };
  }