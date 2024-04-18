export enum send {
    visible = 'appearance:visible',
    data = 'appearance:data',
}

export enum appearance {
    setModel = 'appearance:setModel',
    setHeadStructure = 'appearance:setHeadStructure',
    setHeadOverlay = 'appearance:setHeadOverlay',
    setHeadBlend = 'appearance:setHeadBlend',
    setProp = 'appearance:setProp',
    setDrawable = 'appearance:setDrawable',
    setTattoos = 'appearance:setTattoos',
    getModelTattoos = 'appearance:getModelTattoos',
}

export enum outfits {
    useOutfit = 'appearance:useOutfit',
    renameOutfit = 'appearance:renameOutfit',
    deleteOutfit = 'appearance:deleteOutfit',
    saveOutfit = 'appearance:saveOutfit',
}

export enum receive {
    close = 'appearance:close',

    toggleItem = 'appearance:toggleItem',

    save = 'appearance:save',
    cancel = 'appearance:cancel',

    camZoom = 'appearance:camZoom',
    camMove = 'appearance:camMove',
    camScroll = 'appearance:camScroll',
}