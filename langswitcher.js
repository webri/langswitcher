/*
 * Copyright (c) 2012 Britta Weiland
 * Version 0.2
 *
 * License MIT (http://www.opensource.org/licenses/mit-license.html)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the "Software"), to deal 
 * in the Software without restriction, including without limitation the rights 
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 * copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR 
 * IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */
var LangSwitcher = (function () {
    "use strict";

    var instantiated;

    // Singleton
    function init(){  
        var path_language_files = "xml/languages/lang_";
        var registered_elements = [];
        
        var loaded_languages = [];
        var requested_language = "";
        var curr_language = "";
        
        var curr_file_path = "";
        var asynch_elements = false;
        
        var setLanguage = function(lang){
            if(lang !== curr_language){
                requested_language = lang;
                curr_file_path = path_language_files + lang + ".xml";
                importXML(curr_file_path);
            }
        };
        
        var xmlDoc;

        function importXML(xmlfile){
          
            // check if requested language was already loaded
            var loaded_lang_len = loaded_languages.length;
            for(var i = 0; i < loaded_lang_len; i++){
                if(loaded_languages[i].lang === requested_language){
                    // language has already been loaded, replace elements 
                    // with xml from array
                    curr_language = requested_language;
                    requested_language = "";
                    xmlDoc = loaded_languages[i].xml;
                    replaceTextInElements();
                    return;
                }
            }
          
            // language still needs to be loaded
            // TODO: show preloader
            var xmlhttp;
            try{
                xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", xmlfile, false);
            }catch (Exception){
                var ie = (typeof window.ActiveXObject != 'undefined');

                if (ie){
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = false;
                    while(xmlDoc.readyState != 4) {};
                    xmlDoc.load(xmlfile);
                    xmlLoadingComplete();
                }else{
                    xmlDoc = document.implementation.createDocument("", "", null);
                    xmlDoc.onload = xmlLoadingComplete;
                    xmlDoc.load(xmlfile);
                }
            }

            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send("");
            xmlDoc = xmlhttp.responseXML;
            xmlLoadingComplete();
        }


        function xmlLoadingComplete(){
            // new language has been loaded
            curr_language = requested_language;
            requested_language = "";
            loaded_languages.push({"lang" : curr_language, "xml" : xmlDoc});
            
            replaceTextInElements();
        }


        function replaceTextInElements(){
            if(registered_elements.length === 0 || asynch_elements){
                registered_elements = document.querySelectorAll('[data-langkey]');
            }
                     
            var len = registered_elements.length;
            while (len--) {
                var curr_el = registered_elements[len];

                var key = curr_el.getAttribute('data-langkey');
                var curr_keys = key.split("."); 
               
                var text = xmlDoc;
                var keylen = curr_keys.length;
                for(var i=0; i<keylen; i++){
                    text = text.getElementsByTagName(curr_keys[i])[0];
                }

                curr_el.innerHTML = text.childNodes[0].nodeValue;
            }
        }



        
        //////////////////////////
        /// PUBLIC 
        /////////////////////////
        return {
            setLanguage:function(lang){
                setLanguage(lang);
            },
            
            setPathToLanguageFiles:function(path){
                path_language_files = path;
            },
            
            setAsynchElements:function(asynch){
                asynch_elements = asynch;
            }
        };
    }
    
    
    return {
        getInstance: function () {
            if ( !instantiated ){
                instantiated = init();
            }
            return instantiated;
        }
    };
      
})();