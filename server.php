<?php

$_POST = json_decode(file_get_contents("php://input"), true);       // Dekodiruet iz 'JSON' v 'object' //

echo var_dump($_POST); //'POST'-Prinimaet dannie ot clienta,'var_dump'-prevrashaet v 'string','echo'-pokazivaet v vide 'response' //

