import axios from 'axios'

const url = '/api/motherBoard';

class MobService {
// Get Posts

static getMobs(){
    return new Promise(async(resolve, reject)=>{
        try {
            const res = await axios.get(url);
            const data = res.data;
            resolve(data.map(post =>({
                ...post,
                createdAt: new Date(post.createdAt)
            })))
            
        } catch (error) {
            reject(error);           
            
        }
    });
}

    // Create
    static insertMob(mob){// eslint-disable-next-line        
        return axios.put(url, mob);
    }

    // update
    static updateMob(mob){ // eslint-disable-next-line       
        return axios.post(`${url}/${mob._id}`, mob);
    }
    // Delete
    static deleteMob(id){
        return axios.delete(`${url}/${id}`);
    }

}

export default MobService;