[![stars - status-card](https://img.shields.io/github/stars/xBourner/area-card?style=for-the-badge)](https://github.com/xBourner/area-card)
[![forks - status-card](https://img.shields.io/github/forks/xBourner/area-card?style=for-the-badge)](https://github.com/xBourner/area-card)
[![GitHub release](https://img.shields.io/github/release/xBourner/area-card?style=for-the-badge)](https://github.com/xBourner/area-card/releases/)
[![GitHub issues](https://img.shields.io/github/issues/xBourner/area-card?style=for-the-badge)](https://github.com/xBourner/area-card/issues)

<a href="https://www.buymeacoffee.com/bourner"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=bourner&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>
<a href="https://www.paypal.me/gibgas123"><img src="https://github.com/xBourner/status-card/blob/main/.github/paypal.png" alt="PayPal" style="width:235px; height:50px;"></a>

# area-card-plus

#### An Area card for your Home Assistant Dashboard
This card is heavily inspired by the default area card and the work of [@Dwains](https://github.com/dwainscheeren). <br>
I always thought the area card has so much more potential so i made my own one.

The card will show all entities/devices grouped into domains or device classes that are linked to your area. <br>
To make sure this card will work like it should please check if your relevant entities are assigned to the correct domain.

## Overview

![image](https://github.com/user-attachments/assets/fc20f7b0-c539-4144-b6f8-f4b84ab88a5e)

![image](https://github.com/user-attachments/assets/f27c7847-abf3-43c6-a868-14f949af5113)


### Card Features

- based on default HA area card with more features and customization
- shows toggle domains (the ones on the right) which can be toggled to on/off
- shows alert entities (motion, door, window) next to toggle domains
- shows sensor entities (temperatur, humidity etc.) under the area icon
- shows climate entities under the sensor entities

## Popup View

The popup view will show all entities/devices that are assigned to the area.
All cards will be shown as a default tile card with some having tile card features enabled. 

![image](https://github.com/user-attachments/assets/83ff411a-932e-460a-96d7-df78a5011cf2)

## Customization
Basically everything on the card can be customized/shown/hidden via gui. <br>
Below are some screenshots that show what can be done.

<details>
<summary>Click to see full options to customize</summary>
  <br>
  
#### Change area icon, area icon color, area name & area name color

![image](https://github.com/user-attachments/assets/6749c4a2-abbc-43ee-a1d4-427eecd94c4b)

#### Choose domain/device to show
Here you can choose which domain/device class will be shown in the card. <br>
Only domains that are assigned to your area can be choosen. <br>
Drag & Drop is supported and will change the order in the card.

![image](https://github.com/user-attachments/assets/4719032f-ed51-4436-a109-69b99674872c)

#### Change color of domains/device classes
Here you can change the color for all domains/device classes at once. <br>
Inactive/off domains will still be shown as gray.

![image](https://github.com/user-attachments/assets/fe02e382-6b65-4a7c-9b9e-00ecd5e29f43)

#### Show only active domains for toggle_domains

![image](https://github.com/user-attachments/assets/09a22006-566e-4f33-bb24-0a35e40ed9f2)

### Customize Features
These will allow you to edit and customize each domain/device class the way you want.
  
![image](https://github.com/user-attachments/assets/f9f28ada-7361-472b-93ff-08e5504df409)

#### Change tap action, icon or color
Tap action can be choosen between none (nothing happens on click), toggle (click will toggle all entitiies from that domain in your area) or popup (will open popup view for only that domain in your area) <br>
You can select an individual icon & color for each domain if you want

![image](https://github.com/user-attachments/assets/1348ea8b-fecf-43a7-9261-493755174ce1)

### Change card in the popup view
This feature is experimental and YAML only (for now)

Add this code

```yaml
customization_popup:  
  - type: light                           # change it to the domain you want
    card: |-
      type: custom:mushroom-light-card    # change card type to the card you want
      show_brightness_control: true       # use optional card features (not everything tested)
      show_color_control: true
      show_color_temp_control: true
      use_light_color: true
```
### Changing CSS for some items
You can change most things like icon, name of area and alert/toggle domains (border, color, size etc.)

![image](https://github.com/user-attachments/assets/aced58a6-f4c8-481e-93f1-c227e05de080)


</details>


## Installation

### HACS

Add this repository via HACS Custom repositories ([How to add Custom Repositories](https://hacs.xyz/docs/faq/custom_repositories/))

https://github.com/xBourner/area-card-plus


# Settings

All settings are optional. The card should work without setting any parameters in yaml or via GUI. 

```yaml
type: custom:area-card-plus    ### type of the card
area: living-room              ### choose your area 
alert_classes:                 ### choose the alert classes (motion & window are default)
  - motion
  - window
sensor_classes:                ### choose your sensor classes (temperature & humidity are default)
  - temperature
  - humidity
toggle_domains: []             ### choose your toggle_domains (all possible values will be shown at default)
popup_domains:                 ### choose the domains which are shown in popup view (all possible values will be shown at default)
  - person
  - update
  - calendar
columns: 4                     ### how many columns will be shown in popup view
customization_domain: []       ### choose the customization for toggle_domains
customization_alert: []        ### choose the customization for alert_domains
customization_sensor: []       ### choose the customization for sensor_domains
```






