    //  Obshenie s Serverom  //

    const postData = async (url, data) => {             // "async" Govorit chto kod Asinxronniy //          
        const res = await fetch(url, {                  //  Proisxodit zapros i "await" jDeT kogda poluchit "promise" //
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();                        // "await" jDeT okonchaniya funkcii //
    };
   
    // ================== //
    
    const getResource = async (url) => {            // Zapros dannix s servera dlya sozdaniya MenuCard //
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();                    // Vivod dannix v formate JSON //
    };

    export {postData};
    export{getResource};