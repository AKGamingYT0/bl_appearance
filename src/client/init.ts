import { TAppearance, TMenuTypes } from "@typings/appearance"
import { openMenu } from "./menu"
import { setPedAppearance, setPlayerPedAppearance } from "./appearance/setters"
import { delay, triggerServerCallback } from "@utils"
import { getAppearance } from "./appearance/getters"

let isInSprite: TMenuTypes | null = null

const config = exports.bl_appearance.config()

RegisterCommand('openMenu', () => {
    openMenu('appearance')  
    console.log('Menu opened')
  }, false)


exports('SetPedAppearance', (ped: number, appearance: TAppearance) => {
    setPedAppearance(ped, appearance)
})

exports('SetPlayerPedAppearance', async (frameworkID) => {
    let appearance
    if  (config.backwardsCompatibility) {
        const oldAppearance = await triggerServerCallback<TAppearance>('bl_appearance:server:PreviousGetAppearance', frameworkID)

        if (config.previousClothing == 'illenium') {
            exports['illenium-appearance'].setPedAppearance(PlayerPedId(), oldAppearance)
        } else if (config.previousClothing == 'qb') {
            emit('qb-clothing:client:loadPlayerClothing', oldAppearance, PlayerPedId())
        }

        await delay(100)

        appearance = getAppearance(PlayerPedId())
    }

    appearance = await triggerServerCallback<TAppearance>('bl_appearance:server:getAppearance', frameworkID)
    setPlayerPedAppearance(appearance)
})

exports('GetPlayerPedAppearance', async (frameworkID) => {
    return await triggerServerCallback<TAppearance>('bl_appearance:server:getAppearance', frameworkID)
})

const zones = exports.bl_appearance.zones()
const bl_sprites = exports.bl_sprites


RegisterCommand('+openAppearance', () => {
    if (!isInSprite) return
    openMenu(isInSprite)
}, false)


RegisterKeyMapping('+openAppearance', 'Open Appearance', 'keyboard', config.openControl)

for (const element of zones) {
    bl_sprites.sprite({
        coords: element.coords,
        shape: 'hex',
        key: config.openControl,
        distance: 3.0,
        onEnter: () => isInSprite = element.type,
        onExit: () => isInSprite = null
    })
}