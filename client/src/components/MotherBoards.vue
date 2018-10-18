<template>
    <v-container>
       <h2 class="display-1">Mother Boards</h2>
       <v-divider></v-divider>
        <pre>{{ nameFlags }}</pre>       
        <pre v-if="errors.items.length">{{ errors.items }}</pre>
        <v-form v-model="valid">
            <v-text-field
                
                v-model.trim="mob.name"                
                :counter="10"
                label="Nombre"
                name="name"
                required
                :rules="nameRules"
            ></v-text-field>
            <span class="red--text">{{ errors.first('name')}}</span>
            <v-text-field
                v-model="mob.price"                
                label="Precio"
                name="price"
                type="number"
                v-validate="'numeric'"
            ></v-text-field>
              <span class="red--text">{{ errors.first('price')}}</span>

              <v-select
                :items="stores"
                label="Tienda"
                v-model="mob.store"
                name="store"
                v-validate="'required'"
            ></v-select>
              <span class="red--text">{{ errors.first('store')}}</span>
                <v-btn class="primary" @click="insertMob">Crear nueva Motherboard</v-btn>
                <v-btn class="grey white--text" @click="editMode = !editMode" flat>Editar Motherboard</v-btn>
                <v-btn v-if="editMode" class="grey white--text" @click="saveAll" flat>Guardar todos los cambios</v-btn>
        </v-form>
        <br>
        <div class="text-xs-right">
            <span>Total <strong>{{items.length}}</strong>
                Motherboards</span>
        </div>
         <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
            class="elevation-1"
            v-if="!editMode"
        >
            <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.price }}</td>
            <td class="text-xs-center">{{ props.item.store }}</td>
            <td class="text-xs-center">{{ props.item.createdAt.getDate() }} / {{ props.item.createdAt.getMonth() }} / {{ props.item.createdAt.getFullYear() }}</td>      
            <td class="text-xs-center">
                <v-btn class="error" @click="deleteMob(props.item._id)">
                    Eliminar
                </v-btn>
            </td>
            </template>
        </v-data-table>

             <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
            class="elevation-1"
            v-else
        >
            <template slot="items" slot-scope="props">
            <td>
               
                 <v-text-field
                    v-model="props.item.name"
                    :rules="nameRules"
                    :counter="10"
                    label="Nombre"                   
                ></v-text-field>
            </td>
            <td class="text-xs-left">
                   <v-text-field
                        v-model="props.item.price"                
                        label="Precio"
                        required
                        type="number">       </v-text-field>

            </td>
            <td class="text-xs-center">
                    <v-select
                :items="stores"
                label="Tienda"
                v-model="props.item.store"
            ></v-select>
            </td>
            <td class="text-xs-center">{{ props.item.createdAt.getDate() }} / {{ props.item.createdAt.getMonth() }} / {{ props.item.createdAt.getFullYear() }}</td>      
        
            </template>
        </v-data-table>
       
    </v-container>
</template>

<script>

import MobService from '@/services/MobService';
import { mapFields } from 'vee-validate';

export default {
    name: 'MotherBoard',
    async created(){
        this.items = await MobService.getMobs();       
    },
    computed:{
        ...mapFields({
            nameFlags: 'name'
        })
    },
    data() {
        return {
                editMode: false,
                mob:{ name: '', price: null, store: ''},
                stores: [ 'Mr PC', 'Speedlogic', 'Infoshop', 'Tauret Computadores'],
                valid: false,
                name: '',
                nameRules: [
                    v => !!v || 'Name is required',
                    v => v.length <= 100 || 'Name must be less than 10 characters'
                ],           
            headers: [
            {
                text: 'Nombre',
                align: 'left',
                sortable: false,
                value: 'name'
            },
            { text: 'Precio', value: 'price', align: 'left' },
            { text: 'Tienda', value: 'store', align: 'center' },
            { text: 'Creado en', value: 'createdAt', align: 'center' } ,
            { text: 'Action', align: 'center'}        
            ],
            items: []
        }
    },
methods:{
    async insertMob(){
        if(!this.nameFlags.untouched) return;
        
        await  MobService.insertMob(this.mob);
        this.items = await MobService.getMobs();
    },
    async saveAll (){
        console.log(this.nameFlags, this.fields);
        //this.items.forEach(mob => MobService.updateMob(mob));
    },
    async deleteMob(id){
        await MobService.deleteMob(id);
        this.items = await MobService.getMobs();
    }
}
}
</script>

<style>

</style>
