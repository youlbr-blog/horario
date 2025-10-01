import { horaAMinutosTotales } from "./utils";

export class Dia {
  constructor(objeto) {
    this.nombre = objeto.nombre;
    this.descanso = objeto.descanso;
    this.abreviatura = objeto.abreviatura;
    this.totalHoraLibre = objeto.totalHoraLibre;
    this.totalHoraOcupada = objeto.totalHoraOcupada;
    this.actividadesNecesarios = objeto.actividadesNecesarios;
    this.actividadesProgramadas = objeto.actividadesProgramadas;
    this.horasOcupadas = objeto.horasOcupadas;
  }

  // Cambiado para que modifique la propiedad 'descanso'
  marcarDescanso() {
    this.descanso = true;
  }

  verificarSiYAocupado() {
    return this.horasOcupadas.length > 0;
  }

  desmarcarDescanso() {
    this.descanso = false;
  }

  addActividad(horaInicio, horas, actividad) {
    const horaInicioConver = horaAMinutosTotales(horaInicio);
    const value = this.verificarHoras(horaInicioConver, horas, actividad);
    if (value) {
      return value;
    }

    // 🔥 CORRECCIÓN: Calcular 'hasta' correctamente
    const horaFin = horaInicioConver + horas;
    let hastaFinal;

    if (horaFin > 1440) {
      // Si cruza medianoche, normalizar
      hastaFinal = horaFin - 1440;
    } else {
      hastaFinal = horaFin;
    }

    const actividadHora = {
      desde: horaInicioConver,
      hasta: hastaFinal, // ✅ Ahora usa la hora final correcta
      actividad: actividad,
      horas: horas,
    };

    this.actividadesNecesarios[actividad] = actividadHora;
    this.verifyExisADD(actividadHora, horas);
    return false;
  }

  verifyExisADD(ele, hora) {
    if (this.horasOcupadas.find((e) => e.actividad == ele.actividad)) {
      const indiceActividad = this.horasOcupadas.findIndex(
        (e) => e.actividad === ele.actividad
      );
      const actividad = this.horasOcupadas[indiceActividad];
      if (actividad) {
        const diferenciaMinutos = ele.horas - actividad.horas; // Nuevo tiempo - Viejo tiempo
        this.horasOcupadas[indiceActividad] = ele; // Reemplazar la actividad
        this.totalHoraOcupada += diferenciaMinutos; // Añadir o restar la diferencia
        this.totalHoraLibre -= diferenciaMinutos; // Restar o añadir la diferencia
      }
    } else {
      this.horasOcupadas.push(ele);
      this.totalHoraLibre -= hora;
      this.totalHoraOcupada += hora;
    }
  }

  verificarHoras(horaInicio, horas, acti) {
    // Definimos el límite del ciclo diario en minutos
    const MINUTOS_EN_DIA = 1440;

    // horaFin es exclusiva, el tiempo termina ANTES de ese minuto
    const horaFin = horaInicio + horas;

    if (this.descanso) {
      console.log("❌ No se puede programar. Es un día de descanso.");
      return "Día de descanso";
    }

    // Filtrar las otras actividades para excluir la que se está modificando
    const otrasActividades = this.horasOcupadas.filter(
      (act) => act.actividad !== acti
    );

    // Si no hay otras actividades, está libre
    if (otrasActividades.length === 0) {
      return false;
    }

    // 🔥 CORRECCIÓN: Manejar actividades existentes que pueden tener 'hasta' normalizado
    for (const { desde, hasta, actividad } of otrasActividades) {
      let seSolapan = false;

      // Determinar si la actividad existente cruza medianoche
      const actividadExistenteCruzaMedianoche = hasta < desde;

      if (!actividadExistenteCruzaMedianoche) {
        // Caso Normal: La actividad existente NO cruza medianoche
        if (horaFin <= MINUTOS_EN_DIA) {
          // Nueva actividad tampoco cruza medianoche
          seSolapan = horaInicio < hasta && horaFin > desde;
        } else {
          // Nueva actividad SÍ cruza medianoche
          // Parte 1: [horaInicio, 1440) vs [desde, hasta)
          const solapa1 = horaInicio < hasta && MINUTOS_EN_DIA > desde;
          // Parte 2: [0, horaFin-1440) vs [desde, hasta)
          const finNormalizado = horaFin - MINUTOS_EN_DIA;
          const solapa2 = 0 < hasta && finNormalizado > desde;
          seSolapan = solapa1 || solapa2;
        }
      } else {
        // Caso: La actividad existente SÍ cruza medianoche
        // La actividad existente ocupa [desde, 1440) y [0, hasta)

        if (horaFin <= MINUTOS_EN_DIA) {
          // Nueva actividad NO cruza medianoche [horaInicio, horaFin)
          // Verificar contra las dos partes de la actividad existente:
          // Parte 1: [desde, 1440)
          const solapa1 = horaInicio < MINUTOS_EN_DIA && horaFin > desde;
          // Parte 2: [0, hasta)
          const solapa2 = horaInicio < hasta && horaFin > 0;
          seSolapan = solapa1 || solapa2;
        } else {
          // Ambas actividades cruzan medianoche
          const finNormalizado = horaFin - MINUTOS_EN_DIA;

          // Nueva [horaInicio, 1440) vs Existente [desde, 1440)
          const solapa1 = horaInicio < MINUTOS_EN_DIA && MINUTOS_EN_DIA > desde;
          // Nueva [horaInicio, 1440) vs Existente [0, hasta)
          const solapa2 = horaInicio < hasta && MINUTOS_EN_DIA > 0;
          // Nueva [0, finNormalizado) vs Existente [desde, 1440)
          const solapa3 = 0 < MINUTOS_EN_DIA && finNormalizado > desde;
          // Nueva [0, finNormalizado) vs Existente [0, hasta)
          const solapa4 = 0 < hasta && finNormalizado > 0;

          seSolapan = solapa1 || solapa2 || solapa3 || solapa4;
        }
      }

      if (seSolapan) {
        console.log(
          `❌ Solapamiento con ${actividad} en el rango [${desde}, ${hasta}).`
        );
        console.log(`   Nueva actividad: [${horaInicio}, ${horaFin})`);
        return actividad;
      }
    }

    return false; // No hay solapamiento
  }

  deleteAll() {
    this.horasOcupadas = [];
    this.actividadesNecesarios = {};
  }
  Delete(actividad) {
    const filter = this.horasOcupadas.filter((e) => e.actividad !== actividad);
    this.horasOcupadas = filter;
    delete this.actividadesNecesarios[actividad];
  }

  copyActividadesAll(horas, actividades) {
    this.horasOcupadas = horas;
    this.actividadesNecesarios = actividades;
  }

  getHorasOcupdas() {
    return this.horasOcupadas;
  }

  getActividadesNecesarios() {
    return this.actividadesNecesarios;
  }
}
