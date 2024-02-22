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
            whatHero(num);
        } else {
            alert('Por favor ingrese un valor numérico');
        }
    });
    // Main function: to search a Hero based in a input number
    function whatHero(num) {
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

    // Function to show information about a hero
    function displayHero(heroData) {
        // Variable contains the structure to show information & modify the HTML with the data
        const hero = `
            <h3>Super Héroe Encontrado</h3>
            <section class="card">
                <section class="row">
                    <section class="col-md-4">
                        <img src="${heroData.image.url}" class="card-img" alt="" />
                    </section>
                    <section class="col-md-8">
                        <section class="card-body">
                            <h5 class="card-title">Nombre: ${heroData.name}</h5>
                            <p class="card-text">Conexiones: ${heroData.connections["group-affiliation"]}</p>
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <em>Publicado por </em>: ${heroData.biography.publisher}
                                </li>
                                <li class="list-group-item">
                                    <em>Ocupación: ${heroData.work.occupation}</em>
                                </li>
                                <li class="list-group-item">
                                    <em>Primera Aparición: ${heroData.biography["first-appearance"]}</em>
                                </li>
                                <li class="list-group-item">
                                    <em>Altura: ${heroData.appearance.height.join(" - ")}</em>
                                </li>
                                <li class="list-group-item">
                                    <em>Peso: ${heroData.appearance.weight.join(" - ")}</em>
                                </li>
                                <li class="list-group-item">
                                    <em>Aliases: ${heroData.biography.aliases}</em>
                                </li>
                            </ul>
                        </section>
                    </section>
                </section>
            </section>
        `;
        $("#result").html(hero); // Show the hero information in the HTML
    }
    // Function to show stats in a graph about a hero
    function displayStats(heroData) {
        // Save stats in an array
        let graph = [];
        // Push stats in the array
        for (let key in heroData.powerstats) {
            graph.push({
                label: key,
                // Transform the string into a number
                y: parseInt(heroData.powerstats[key]),
            });
        }
        // Set options for the graph 
        let options = {
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
        // Show the graph in the HTML
        $("#chart").CanvasJSChart(options);
    }
});