/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    track: {
        src : null,
        volume : '0.5',
    },

    media: null,

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },


    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        this.addListeners();


        
        // navigator.geolocation.getCurrentPosition((position) => {
        //      document.getElementById("location").innerHTML =
        //         'Latitude: '          + position.coords.latitude          + '<br>' +
        //         'Longitude: '         + position.coords.longitude         + '<br>' +
        //         'Altitude: '          + position.coords.altitude          + '<br>' +
        //         'Accuracy: '          + position.coords.accuracy          + '<br>' +
        //         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br>' +
        //         'Heading: '           + position.coords.heading           + '<br>' +
        //         'Speed: '             + position.coords.speed             + '<br>' +
        //         'Timestamp: '         + position.timestamp                + '<br>';
        // }, (error) => {
        //     console.log(error);
        // })

        // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, (fs) => {
        //     console.log(fs);

        //     fs.root.getFile("poutre.txt", { create: true, exclusive: false }, (entry) => {

        //         entry.createWriter((fileWriter) => {

        //             fileWriter.onwriteend = () => {
        //                 console.log("Finish writing");
        //             };

        //             fileWriter.onerror = (error) => {
        //                 console.log("Erreur pendant l'ecriture du fichier: " + error.toString());
        //             }

        //             fileWriter.onwritestart = () => {
        //                 console.log("Writing...");
        //             };

        //             fileWriter.write(
        //                 "Cordova : " + device.cordova +
        //                 "<br>Model : " + device.model +
        //                 "<br>Plateform : " + device.platform +
        //                 "<br>UUID : " + device.uuid +
        //                 "<br>Version : " + device.version +
        //                 "<br>Manufacturer : " + device.manufacturer
        //             );

        //         }, (error) => {
        //             console.log(error);
        //         });

        //     }, (error) => {
        //         console.log(error);
        //     });

        // }, (error) => {
        //     console.log(error);
        // })

        // document.getElementById("device").innerHTML =
        // "Cordova : " + device.cordova +
        // "<br>Model : " + device.model +
        // "<br>Plateform : " + device.platform +
        // "<br>UUID : " + device.uuid +
        // "<br>Version : " + device.version +
        // "<br>Manufacturer : " + device.manufacturer
        //  ;

        // window.addEventListener("batterystatus", (status) => {
        //     console.log(status);
        //     document.getElementById("battery").innerHTML = "Battery level: " + status.level + "%\nIs phone plugged: " + status.isPlugged;
        // })

        // document.getElementById("cam-btn").addEventListener('click', () => navigator.camera.getPicture(this.onSucessPicture, this.onErrorPicture));
        // document.getElementById("library-btn").addEventListener('click', () => navigator.camera.getPicture(this.onSucessPicture, this.onErrorPicture, { sourceType: Camera.PictureSourceType.PHOTOLIBRARY }));

        // document.getElementById("bip-btn").addEventListener('click', () => {
        //     navigator.notification.beep(3);
        // })
        // document.getElementById("vrr-btn").addEventListener('click', () => {
        //     navigator.vibrate([500, 50, 500, 50, 500, 50, 500]);
        // })


    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    onSucessPicture: function(imgUrl) {
        console.log("Sucess!", imgUrl);
        document.getElementById("picture").src = imgUrl;
    },

    onErrorPicture: function(error) {
        console.log("ERROR:", error);
    },

    // ftw: function(){
    //     console.log('Succes');
    // },

    // wtf: function(error){
    //     console.warn('failure');
    //     console.error(error);
    // },

    // statusChange: function(status){
    //     console.log('media status is now : ' + status );
    // },

    addListeners: function(){
        document.getElementById("src-btn").addEventListener("change", () => {
            let file = document.getElementById("src-btn").files[0];

            this.track.src = URL.createObjectURL(file).substring(5);


            this.media = new Media(this.track.src);
            this.media.setVolume(this.track.volume);

            console.log(file)
            console.log(this.track.src)
        } );
        document.getElementById("play-btn").addEventListener('click', () => {
            this.media.play();
            console.log("PLAY");
        });
        document.getElementById("pause-btn").addEventListener('click', () => {
            this.media.pause();
            console.log("STOP");
        });
       document.getElementById("up-btn").addEventListener('click', () => {
        vol = this.track.volume;
        console.log('current volume ' + vol);
        vol += 0.1;
        if(vol > 1){
            vol = 1;
        }
            this.media.setVolume(vol);
            this.track.volume = vol;
            console.log(vol);
       });
        document.getElementById("down-btn").addEventListener('click', () => {
            vol = this.track.volume;
            console.log('current volume ' + vol);
            vol -= 0.1;
            if(vol < 0){
                vol = 0;
            }
            this.media.setVolume(vol);
            this.track.volume = vol;
            console.log(vol);
        });
      //  document.getElementById("ff-btn").addEventListener('click', app.ff);
       // document.getElementById("rew-btn").addEventListener('click', app.rew);
        // document.addEventListener('pause', ()=>{
        //     app.media.release();
        // });
    },


};

app.initialize();
