# Oila connect - Who know who know you?

An exclusive web app to check connections within a group of people (a family).

## Overview

An exculisve application that serves as an exercise tool within a group of people (family).

## The Exercise

Every member is registered, each member logs in, and select all the other members he/she knows. The app calculates the established connections and makes the stats available.

### How is connection and how is it calculated calculated?

A member's connection is calculated based on the people the member claims to know, and those who claims to know the member.

` connects = all members - user.know `

> Connections is just the substraction of the total number of people a user claims to know from the total number of people in .the family.
