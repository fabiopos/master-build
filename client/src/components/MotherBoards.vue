<template>
    <div>
       <h2>Mother Boards</h2>

         <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.price }}</td>
      <td class="text-xs-right">{{ props.item.store }}</td>
      <td class="text-xs-right">{{ props.item.createdAt.getDate() }} / {{ props.item.createdAt.getMonth() }} / {{ props.item.createdAt.getFullYear() }}</td>      
    </template>
  </v-data-table>
    </div>
</template>

<script>
import MobService from '@/services/MobService';

export default {
    async created(){
        this.items = await MobService.getMobs();
    },
data() {
    return {
          headers: [
          {
            text: 'Nombre',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Precio', value: 'price' },
          { text: 'Tienda', value: 'store' },
          { text: 'Creado en', value: 'createdAt' }          
        ],
        items: []
    }
}
}
</script>

<style>

</style>
