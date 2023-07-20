<script setup>
import { onMounted, reactive, ref } from 'vue';

import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';

const mostrarModal = ref(false);
const mensajeConfirmacion = ref('');

const miVariableReactiva = reactive({
  datos: ([])
});

const searchTerm = reactive({
  term: "",
});

async function obtenerDatosDeAPI(terminoBusqueda) {
  try {
    const respuesta = await fetch(`https://data-movies.vercel.app/movies?search=${terminoBusqueda}`);
    const datos = await respuesta.json();
    miVariableReactiva.datos = datos;
    console.log(datos)
  } catch (error) {
    console.error('Error al obtener los datos de la API:', error);
  }
}

onMounted(() => {
  obtenerDatosDeAPI("");
});

const abrirEnlace = (enlace) => {
  window.open(enlace, '_blank');
};

const realizarBusqueda = () => {
  obtenerDatosDeAPI(searchTerm.term);
};

const nuevoDato = reactive({
  name: '',
  description: '',
  year: '',
  image: '',
  enlace: '',
  category: ''
});

async function crearDato() {
  try {
    const respuesta = await fetch('https://data-movies.vercel.app/movies', {
      method: 'POST',
      body: nuevoDato,
      headers: { "content-type": "application/json" }
    });
    if (respuesta.ok) {
      mensajeConfirmacion.value = 'Dato creado exitosamente';
    } else {
      mensajeConfirmacion.value = `Error al crear el dato: ${respuesta.statusText}`;
    }
  } catch (error) {
    console.error('Error en la petición:', error);
  }
}

</script>

<!-- <template>
  <div v-for="datos in miVariableReactiva.datos" :key="datos.id">
  <h1>nombre: {{ datos.name }}</h1>
  </div>
</template> -->

<template>
  <div class="block w-full h-full bg-black">
    <div id="app">
      <input type="text" v-model="searchTerm.term" @input="realizarBusqueda" placeholder="Buscar"
        class="relative z-50 m-8 ml-60 block w-[300px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary">
      <button v-if="!mostrarModal" @click="mostrarModal = true"
        class="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
        Crear Película
      </button>
    </div>
    <div v-if="!mostrarModal" id="SideNav" class="flex z-40 items-center w-[120px] h-screen bg-transparent absolute">
      <img class="absolute top-0 w-[65px] mt-5 ml-5" src="https://i.postimg.cc/NfdKNCst/Cinex-dorado.png">
    </div>


    <div v-if="!mostrarModal" class="m-40 text-2xl mb-[-80px] text-white">
      <h1 class="leading-10 text-[55px]  mb-[-1100px] font-semibold font-serif">ESTRENOS</h1>
    </div>
    <div v-if="!mostrarModal" v-for="datos in miVariableReactiva.datos" :key="datos.id"
      class="flex m-20 z-40 text-white w-[90%]">
      <div v-if="datos.category.includes('Estrenos')" class="flex z-40 text-white w-[100%]">
        <div class="py-0">
          <img :src="datos.image" class="h-[700px] max-w-[600px] rounded-lg">
        </div>
        <div class="m-20 text-2xl pt-6">
          <div class="leading-10 text-[55px] font-semibold font-serif">
            {{ datos.name }}
          </div>
          <div class="flex text-lg pt-4">
            <div>
              {{ datos.year }}
            </div>
            <div class="relative">
              <span class="absolute left-[2px] -top-[12px] text-[40px]">.</span>
              <span class="pl-4">{{ datos.category }}</span>
            </div>
          </div>
          <div class="mt-10 mb-20">
            {{ datos.description }}
          </div>
          <button @click="abrirEnlace(datos.enlace)"
            class="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">Ver
            Tráiler</button>
        </div>
      </div>
    </div>


    <div v-if="!mostrarModal" class="m-40 text-2xl mb-[-80px] text-white">
      <h1 class="leading-10 text-[55px] font-semibold font-serif">DRAMA</h1>
    </div>
    <div v-if="!mostrarModal" v-for="datos in miVariableReactiva.datos" :key="datos.id"
      class="flex m-20 z-40 text-white w-[90%]">
      <div v-if="datos.category.includes('Drama')" class="flex m-20 z-40 text-white w-[100%]">
        <div class="py-0">
          <img :src="datos.image" class="h-[700px] max-w-[600px] rounded-lg">
        </div>
        <div class="m-20 text-2xl pt-6">
          <div class="leading-10 text-[55px] font-semibold font-serif">
            {{ datos.name }}
          </div>
          <div class="flex text-lg pt-4">
            <div>
              {{ datos.year }}
            </div>
            <div class="relative">
              <span class="absolute left-[2px] -top-[12px] text-[40px]">.</span>
              <span class="pl-4">{{ datos.category }}</span>
            </div>
          </div>
          <div class="mt-10 mb-20">
            {{ datos.description }}
          </div>
          <button @click="abrirEnlace(datos.enlace)"
            class="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">Ver
            Tráiler</button>
        </div>
      </div>
    </div>

    <div v-if="!mostrarModal" class="m-40 text-2xl mb-[-80px] text-white">
      <h1 class="leading-10 text-[55px] font-semibold font-serif">ACTION</h1>
    </div>
    <div v-if="!mostrarModal" v-for="datos in miVariableReactiva.datos" :key="datos.id"
      class="flex m-20 z-40 text-white w-[90%]">
      <div v-if="datos.category.includes('Action')" class="flex m-20 z-40 text-white w-[100%]">
        <div class="py-0">
          <img :src="datos.image" class="h-[700px] max-w-[600px] rounded-lg">
        </div>
        <div class="m-20 text-2xl pt-6">
          <div class="leading-10 text-[55px] font-semibold font-serif">
            {{ datos.name }}
          </div>
          <div class="flex text-lg pt-4">
            <div>
              {{ datos.year }}
            </div>
            <div class="relative">
              <span class="absolute left-[2px] -top-[12px] text-[40px]">.</span>
              <span class="pl-4">{{ datos.category }}</span>
            </div>
          </div>
          <div class="mt-10 mb-20">
            {{ datos.description }}
          </div>
          <button @click="abrirEnlace(datos.enlace)"
            class="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">Ver
            Tráiler</button>
        </div>
      </div>
    </div>


    <div v-if="!mostrarModal" class="m-40 text-2xl mb-[-80px] text-white">
      <h1 class="leading-10 text-[55px] font-semibold font-serif">ADVENTURE</h1>
    </div>
    <div v-if="!mostrarModal" v-for="datos in miVariableReactiva.datos" :key="datos.id"
      class="flex m-20 z-40 text-white w-[90%]">
      <div v-if="datos.category.includes('Adventure')" class="flex m-20 z-40 text-white w-[100%]">
        <div class="py-0">
          <img :src="datos.image" class="h-[700px] max-w-[600px] rounded-lg">
        </div>
        <div class="m-20 text-2xl pt-6">
          <div class="leading-10 text-[55px] font-semibold font-serif">
            {{ datos.name }}
          </div>
          <div class="flex text-lg pt-4">
            <div>
              {{ datos.year }}
            </div>
            <div class="relative">
              <span class="absolute left-[2px] -top-[12px] text-[40px]">.</span>
              <span class="pl-4">{{ datos.category }}</span>
            </div>
          </div>
          <div class="mt-10 mb-20">
            {{ datos.description }}
          </div>
          <button @click="abrirEnlace(datos.enlace)"
            class="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">Ver
            Tráiler</button>
        </div>
      </div>
    </div>

    <div v-if="!mostrarModal" class="m-40 text-2xl mb-[-80px] text-white">
      <h1 class="leading-10 text-[55px] font-semibold font-serif">HORROR</h1>
    </div>
    <div v-if="!mostrarModal" v-for="datos in miVariableReactiva.datos" :key="datos.id"
      class="flex m-20 z-40 text-white w-[90%]">
      <div v-if="datos.category.includes('Horror')" class="flex m-20 z-40 text-white w-[100%]">
        <div class="py-0">
          <img :src="datos.image" class="h-[700px] max-w-[600px] rounded-lg">
        </div>
        <div class="m-20 text-2xl pt-6">
          <div class="leading-10 text-[55px] font-semibold font-serif">
            {{ datos.name }}
          </div>
          <div class="flex text-lg pt-4">
            <div>
              {{ datos.year }}
            </div>
            <div class="relative">
              <span class="absolute left-[2px] -top-[12px] text-[40px]">.</span>
              <span class="pl-4">{{ datos.category }}</span>
            </div>
          </div>
          <div class="mt-10 mb-20">
            {{ datos.description }}
          </div>
          <button @click="abrirEnlace(datos.enlace)"
            class="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">Ver
            Tráiler</button>
        </div>
      </div>
    </div>

    <div v-if="!mostrarModal" class="m-40 text-2xl mb-[-80px] text-white">
      <h1 class="leading-10 text-[55px] font-semibold font-serif">COMEDY</h1>
    </div>
    <div v-if="!mostrarModal" v-for="datos in miVariableReactiva.datos" :key="datos.id"
      class="flex m-20 z-40 text-white w-[90%]">
      <div v-if="datos.category.includes('Comedy')" class="flex m-20 z-40 text-white w-[100%]">
        <div class="py-0">
          <img :src="datos.image" class="h-[700px] max-w-[600px] rounded-lg">
        </div>
        <div class="m-20 text-2xl pt-6">
          <div class="leading-10 text-[55px] font-semibold font-serif">
            {{ datos.name }}
          </div>
          <div class="flex text-lg pt-4">
            <div>
              {{ datos.year }}
            </div>
            <div class="relative">
              <span class="absolute left-[2px] -top-[12px] text-[40px]">.</span>
              <span class="pl-4">{{ datos.category }}</span>
            </div>
          </div>
          <div class="mt-10 mb-20">
            {{ datos.description }}
          </div>
          <button @click="abrirEnlace(datos.enlace)"
            class="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">Ver
            Tráiler</button>
        </div>
      </div>
    </div>

    <div v-if="mostrarModal" class="block w-full min-h-[1000px] bg-black">
      <div @click="$event => mostrarModal = false"
        class="absolute z-50 p-2 m-4 bg-white bg-opacity-50 rounded-full cursor-pointer">
        <ChevronLeft fillColor="#ffffff" :size="40" />
      </div>
      <div>
        <div class="text-black">
          <input v-model="nuevoDato.name" placeholder="Name">
          <input v-model="nuevoDato.description" placeholder="Description">
          <input v-model="nuevoDato.year" placeholder="Year">
          <input v-model="nuevoDato.image" placeholder="Image">
          <input v-model="nuevoDato.enlace" placeholder="Enlace">
          <input v-model="nuevoDato.category" placeholder="Category">
          <button @click="crearDato">Create Movie</button>
          <div v-if="mensajeConfirmacion">{{ mensajeConfirmacion }}</div>
        </div>
      </div>
    </div>
  </div>
</template>