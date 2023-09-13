import { useState, useEffect } from "react";

function useTareas() {
  const [tareas, setTareas] = useState(() => {
    const storedTareas = localStorage.getItem("tareas");
    return storedTareas ? JSON.parse(storedTareas) : [];
  });
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [nuevaDescripcion, setNuevaDescripcion] = useState(""); // Agregar estado para descripción

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  const controlarAgregarTarea = () => {
    if (
      nuevaDescripcion.length <= 20 &&
      nuevaTarea.length >= 3 &&
      nuevaTarea.length <= 20
    ) {
      const nuevasTareas = [
        {
          texto: nuevaTarea,
          completada: false,
          descripcion: nuevaDescripcion, // Incluye la descripción
        },
        ...tareas,
      ];
      setTareas(nuevasTareas);
      setNuevaTarea("");
      setNuevaDescripcion("");
    } else {
      window.alert("textos deberán contener 3 y 20 caracteres");
    }
  };

  const controlarAlternarCompletada = (index) => {
    const tareasActualizadas = [...tareas];
    tareasActualizadas[index].completada =
      !tareasActualizadas[index].completada;
    setTareas(tareasActualizadas);
  };

  const controlarEliminarTarea = (index) => {
    const tareasActualizadas = tareas.filter((tarea, i) => i !== index);
    setTareas(tareasActualizadas);
    localStorage.setItem("tareas", JSON.stringify(tareasActualizadas));
  };

  const limpiarTodasLasTareas = () => {
    const confirmar = window.confirm(
      "¿Confirma que desea eliminar todas las tareas?"
    );
    if (confirmar) {
      setTareas([]);
      localStorage.removeItem("tareas");
    }
  };

  return {
    tareas,
    nuevaTarea,
    setNuevaTarea,
    nuevaDescripcion, // Agrega la descripción
    setNuevaDescripcion, // Agrega la función para establecer la descripción
    controlarAgregarTarea,
    controlarAlternarCompletada,
    controlarEliminarTarea,
    limpiarTodasLasTareas,
  };
}

export default useTareas;
