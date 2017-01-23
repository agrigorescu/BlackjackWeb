import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);
class ApiService {

    /**
     * This function performs API calls
     * @param obj
     */
    static callApi(obj) {
        return new Promise(
            (resolve, reject) => {

                switch (obj.method) {
                    case "POST":
                        Vue.http.post(obj.path, obj.params).then((result) => {
                            resolve(result);
                        }, (err) => {
                            reject(err);
                        });
                        break;
                    case "GET":
                        Vue.http.get(obj.path).then((result) => {
                         
                            resolve(result);
                        }, (err) => {
                          
                            reject(err);
                        });
                        break;
                    case "PUT":
                        Vue.http.put(obj.path, obj.params).then((result) => {
                           
                            resolve(result);
                        }, (err) => {
                         
                            reject(err);
                        });
                        break;
                    case "DELETE":
                        Vue.http.delete(obj.path, obj.params).then((result) => {
                          
                            resolve(result);
                        }, (err) => {
                            
                            reject(err);
                        });
                        break;
                    case "POST-MULTI":
                        const data = new FormData();
                        data.append('file', obj.params.file);
                        delete obj.params.file;
                        data.append('data', JSON.stringify(obj.params));
                        Vue.http.post(obj.path,data,{headers: {'Content-Type': 'multipart/form-data'}}).then((result) => {
                        
                            resolve(result);
                        }, (err) => {
                         
                            reject(err);
                        });
                        break;
                }
            }
        )
    }
}

module.exports = ApiService;