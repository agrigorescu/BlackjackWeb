<template>
    <main-layout>
           <h2> Confirmation of registration!! </h2>
           <button class="btn waves-effect waves-light right" style="top: 200px" type="submit" name="action" v-on:click="submit($event)" href="/">Back to homepage</button>
    </main-layout>
</template>

<script>
    /**
 * Creating an instance of the Vue class
 * */
    import MainLayout from '../layouts/Main.vue'

    const api = require("../services/api");
    export default {
        components: {
            MainLayout
        },
        data: function () {
            return {
                userName: '',
                token: '',
                formSubmitted: false
            }
        },
        methods: {
            // submitting the post request to the back end API
            submit: function (event) {
                event.preventDefault();
                let olekObj = this.getUrlParameters();
                api.callApi({method: 'POST', path: 'https://blackjackapi00.herokuapp.com/accountvalidation',params:{username:olekObj.username,token:olekObj.token}})
                .then(result => {
                    console.log("data sent");
                    //store token and ID
                })
                .catch(err => {
                    console.log("did not send");
                });
            },
            getUrlParameters: function (url) {

                // get query string from url (optional) or window
                var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

                // we'll store the parameters here
                var obj = {};

                // if query string exists
                if (queryString) {

                    // stuff after # is not part of query string, so get rid of it
                    queryString = queryString.split('#')[0];

                    // split our query string into its component parts
                    var arr = queryString.split('&');

                    for (var i = 0; i < arr.length; i++) {
                        // separate the keys and the values
                        var a = arr[i].split('=');

                        // in case params look like: list[]=thing1&list[]=thing2
                        var paramNum = undefined;
                        var paramName = a[0].replace(/\[\d*\]/, function (v) {
                            paramNum = v.slice(1, -1);
                            return '';
                        });

                        // set parameter value (use 'true' if empty)
                        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

                        // (optional) keep case consistent
                        // paramName = paramName.toLowerCase();
                        // paramValue = paramValue.toLowerCase();

                        // if parameter name already exists
                        if (obj[paramName]) {
                            // convert value to array (if still string)
                            if (typeof obj[paramName] === 'string') {
                                obj[paramName] = [obj[paramName]];
                            }
                            // if no array index number specified...
                            if (typeof paramNum === 'undefined') {
                                // put the value on the end of the array
                                obj[paramName].push(paramValue);
                            }
                            // if array index number specified...
                            else {
                                // put the value at that index number
                                obj[paramName][paramNum] = paramValue;
                            }
                        }
                        // if param name doesn't exist yet, set it
                        else {
                            obj[paramName] = paramValue;
                        }
                    }
                }
                
                return obj;
           
            }
        },
        beforeMount: function () {
            console.log('Mounting');

        }
    }

</script>