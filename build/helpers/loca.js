module.exports = function(text, options) {
    var loca
    var locas = { 
        "anchor_brandNav": "Übersicht der Marken des HR anspringen",
        "anchor_headline": "Sprungmarken",
        "anchor_mainContent": "Inhalt anspringen",
        "anchor_sectionNav": "Bereichsnavigation anspringen",
        "anchor_serviceNav": "Servicenavigation anspringen",
        "anchor_subNav": "Subnavigation des Bereichs {0} anspringen",
        "search_input_aria_submit": "Suche starten",
        "search_input_placeholder": "Ort oder Thema suchen",
        "feature_box_anchor": "Livestream Player anspringen",
        "header_homepage_link_title": "Startseite hessenschau . d e"
    }

    for (let key in locas){
        if(key == text){
            loca = text.replace(text,locas[key])
            return loca
        } 
    }
}