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
            $("#chartContainer").html("");
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
        const hero = `
            <h3>Super Héroe Encontrado</h3>
            <div class="card">
                <div class="row">
                    <div class="col-md-4">
                        <img src="${heroData.image.url}" class="card-img" alt="" />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
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
                        </div>
                    </div>
                </div>
            </div>
        `;
        $("#result").html(hero);
    }
    // Function to show stats in a graph about a hero
    function displayStats(heroData) {
        let graph = [];
        for (let key in heroData.powerstats) {
            graph.push({
                label: key,
                y: parseInt(heroData.powerstats[key]),
            });
        }

        let options = {
            title: {
                text: `Estadísticas de Poder para ${heroData.name}`,
            },
            data: [{
                type: "pie",
                startAngle: 45,
                showInLegend: true,
                legendText: "{label}",
                indexLabel: "{label} ({y})",
                yValueFormatString: "#,##0.#",
                dataPoints: graph,
            }],
        };

        $("#chartContainer").CanvasJSChart(options);
    }
});