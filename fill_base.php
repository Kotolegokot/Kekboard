<?php
// at least one user
$user = new App\User;
$user->name = 'Keque';
$user->login = 'kek';
$user->password = bcrypt('kek');
$user->save();

// some sections
$section = new App\Section;
$section->name = 'shit';
$section->shorthand = 'sh';
$section->save();

$section = new App\Section;
$section->name = 'babies';
$section->shorthand = 'b';
$section->save();
?>
