////////////////////////////////////////////////////////////////////////////////////////////
// MyMenu
////////////////////////////////////////////////////////////////////////////////////////////

function Footer(props) {

  const classes = props.classes;

  return (
    <div>

    <Grid container direction="row" justify="center" alignItems="stretch" className={classes.root}>

    <Grid item container justify="center" xs={12}>
    Site crée par &nbsp;<b>P. Armas</b>&nbsp;
     (<a target="_blank" href="mailto:patrice.armas@gmail.com">contacter</a>)
      pour Alan
    </Grid>
    <Grid item container justify="center" xs={12}>
    Les symboles Pictographiques utilisés sont la propriété de
    CATEDU (<a target="_blank" href="http://arasaac.org">http://arasaac.org</a>) sous
    licence Creative Commons et ont été créés par &nbsp;<b>Sergio Palao</b>
    </Grid>
    <Grid item container justify="center" xs={12}>
    Les Histoires utilisés sont la propriété de
    Pratham Books' StoryWeaver (<a target="_blank" href="https://storyweaver.org.in">https://storyweaver.org.in</a>) sous
    licence Creative Commons
    </Grid>

    </Grid>

    </div>
  );

}
