import { useState, useEffect } from "react";
//manejo de tareas
function useTareas() {
  const [tareas, setTareas] = useState(() => {
    const storedTareas = localStorage.getItem("tareas"); //ls
    return storedTareas ? JSON.parse(storedTareas) : []; //lsto
  });
  const [nuevaTarea, setNuevaTarea] = useState("");

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  const controlarAgregarTarea = () => {
    if (nuevaTarea !== "" && nuevaTarea.length <= 30) {
      const nuevasTareas = [
        { texto: nuevaTarea, completada: false },
        ...tareas,
      ];
      setTareas(nuevasTareas);
      setNuevaTarea("");
    } else {
      window.alert("Error: texto largo o nulo");
    }
  };

  const controlarAlternarCompletada = (index) => {
    const tareasActualizadas = [...tareas];
    tareasActualizadas[index].completada =
      !tareasActualizadas[index].completada;
    setTareas(tareasActualizadas);
  };

  //ELIMINAR TAREA-----------------------------------------------------------
  const controlarEliminarTarea = (index) => {
    const tareasActualizadas = tareas.filter((tarea, i) => i !== index);
    setTareas(tareasActualizadas);
    localStorage.setItem("tareas", JSON.stringify(tareasActualizadas)); // Actualizar localStorage
  };

  const limpiarTodasLasTareas = () => {
    const confirmar = window.confirm(
      "¿confirma que deseas eliminar todas las tareas?"
    );
    if (confirmar) {
      setTareas([]);
      localStorage.removeItem("tareas"); // También limpia el localStorage
    }
  };

  return {
    tareas,
    nuevaTarea,
    setNuevaTarea,
    controlarAgregarTarea,
    controlarAlternarCompletada,
    controlarEliminarTarea,
    limpiarTodasLasTareas,
  };
}

export default useTareas;
