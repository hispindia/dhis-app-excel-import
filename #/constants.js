/**
 * Created by harsh on 23/12/16.
 */


export const DATA_SHEETNAME = "#import";
export const METADATA_SHEETNAME = "#mapping";


export const FIRST_DELIMITER = "#";
export const SECOND_DELIMITER = "@";
export const THIRD_DELIMITER = ".";

export const ALIAS_DOMAINS = {
    ev: "event",
    tei : "trackedEntityInstance",
    en : "enrollment"
};

export const ALIAS_FIELDS = {
    te : "trackedEntity",
    ou : "organisationUnit",
    attr : "attributes",
    teAttr : "trackedEntityAttribute",
    prg : "program",
    ps : "programStage"
}

export const ALIAS_DOMAIN_WISE_FIELDS = {
    event : {
        de : "dataValues",
        tei : "trackedEntityInstance"
    },
    trackedEntityInstance : {
        attr : "attributes"
    },
    enrollment : {
        tei : "trackedEntityInstance"
    }

}
