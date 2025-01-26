[![stars - status-card](https://img.shields.io/github/stars/xBourner/area-card?style=for-the-badge)](https://github.com/xBourner/area-card)
[![forks - status-card](https://img.shields.io/github/forks/xBourner/area-card?style=for-the-badge)](https://github.com/xBourner/area-card)
[![GitHub release](https://img.shields.io/github/release/xBourner/area-card?style=for-the-badge)](https://github.com/xBourner/area-card/releases/)
[![GitHub issues](https://img.shields.io/github/issues/xBourner/area-card?style=for-the-badge)](https://github.com/xBourner/area-card/issues)
# area-card-plus

An Area card for home assistant dashboard

### This is a work in progress. You can use it on your productive HA instance but there could be some bugs.

I will try to add new features to the card so it will be an overview card with the possibilty to show all related devices/entities of an area.
For now i mainly copied the default area card and gave it a nicer look and some features in customization.

![image](https://github.com/user-attachments/assets/48cd7b8b-89ba-405a-85c5-322034246478)

### card shows:

- all possible domains (out of light, media_player, vacuum, switch, fan and lock) for specified area
- all possible binary_sensors and sensors for specified area
- shows climate state if climate entity is heating
- name and icon of the area (possible to change)
- show assigned devices/entities
- toggle domains (toggle for light, media_player, vacuum, switch, fan and lock)

![image](https://github.com/user-attachments/assets/985568d4-177d-48f8-a5da-3836921fb6e5)

![image](https://github.com/user-attachments/assets/d7974e9b-dad5-4bdc-b5fc-d191610063bf)

### cuztomization options for now:

- hide domains that have no active entities (that are greyed out if not hidden)
- sort the order or hide the domain from the card.
- change the color of all active domains at once
- change icon/color for specific domain
  



## Installation

### Hacs

Add this repository via HACS Custom repositories

https://github.com/xBourner/area-card

([How to add Custom Repositories](https://hacs.xyz/docs/faq/custom_repositories/))


# Settings

All settings are optional. The card should work without setting any parameters in yaml or via GUI. 

```yaml
type: custom:custom-area-card
area: living_room 
```






