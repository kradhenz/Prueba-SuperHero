$(document).ready(function () {
    $('#btn').click(function (error) {
        error.preventDefault();
        // Variable to transfrom the input in a int value type
        const num = parseInt($('#idHero').val());
        let isnum = /^[0-9]+$/;
        // Conditional to validate if the input is a number
        if (isnum.test(num)) {
            $("#idHero").val("");
            $("#result").html("");
            $("#chart").html("");
            whichHero(num);
        } else {
            alert('Por favor ingrese un valor numérico');
        }
    });
    // Main function: to search a Hero based in a input number
    function whichHero(num) {
        $.ajax({
            dataType: "json",
            method: "GET",
            url: `https://superheroapi.com/api.php/2619421814940190/${num}`,
            success: function (result) {
                if (result.response === "success") {
                    // Function to show information about a hero
                    displayHero(result);
                    // Function to show stats about a hero
                    displayStats(result);
                } else {
                    alert("No se encontró ningún Super Héroe con ese ID");
                }
            },
            // Error handling: to any diferent error
            error: function (error) {
                console.error(error);
                alert("Ocurrió un error al procesar la solicitud");
            }
        });
    }

    /* > NOTE!: aquí me guié de lo que hizo el profesor porque sinceramente no se me ocurría como trabajar los container que se deben mostrar. Mi contribución fue generar un código más eficiente y ordenado mediante el uso de funciones. < */

    // Important function to manage information about a hero
    function displayHero(heroData) {
        // Variable contains the structure to show information & modify the HTML with the data
        const hero = createHero(heroData);  
        $("#result").html(hero);    // Show information in the HTML
        bioInfo(heroData);
    }
    // Function to show information about a hero
    function createHero(heroData) {
        return `
            <section class="card">
            <h3 class="text-center">Super Héroe Encontrado</h3>
                <section class="row">
                    <section class="col-md-4 pt-5">
                        <img src="${heroData.image.url}" class="card-img ps-3 pt-2" alt="" />
                    </section>
                    <section class="col-md-8">
                        <section class="card-body ps-1">
                            <h5 class="card-title">Nombre: ${heroData.name}</h5>
                            <p class="card-text">Conexiones: ${heroData.connections["group-affiliation"]}</p>
                            <ul class="list-group" id="heroInfoList"></ul>
                        </section>
                    </section>
                </section>
            </section>
        `;  // 'end' return
    }
    // Function to show information about a hero
    function bioInfo(heroData) {
        // Array contains the information about a hero
        const listItems = [
            { label: "Publicado por", value: heroData.biography.publisher },
            { label: "Ocupación", value: heroData.work.occupation },
            { label: "Primera Aparición", value: heroData.biography["first-appearance"] },
            { label: "Altura", value: heroData.appearance.height.join(" - ") },
            { label: "Peso", value: heroData.appearance.weight.join(" - ") },
            { label: "Aliases", value: heroData.biography.aliases.join(", ") }
        ];
        // Show information list in the HTML using map function
        const listHtml = listItems.map(item => `<li class="list-group-item"><em>${item.label}</em>: ${item.value}</li>`).join("");
        $("#heroInfoList").html(listHtml);      // Show information list in the HTML
    }

    // Function to show stats in a graph about a hero
    function displayStats(heroData) {
        let graph = [];     // Array to save stats 
        for (let key in heroData.powerstats) {      // Push stats in the array
            graph.push({
                label: key,
                y: parseInt(heroData.powerstats[key]),      // Transform the string into a number
            });
        }
        let options = {     // Set options for the graph 
            title: {
                text: `Estadísticas de Poder para ${heroData.name}`,
            },
            data: [{
                type: "pie",
                startAngle: 35,
                showInLegend: true,
                legendText: "{label}",
                indexLabel: "{label} ({y})",
                yValueFormatString: "#,##0.#",
                dataPoints: graph,
            }],
        };
        $("#chart").CanvasJSChart(options);     // Show the graph in the HTML
    }
});