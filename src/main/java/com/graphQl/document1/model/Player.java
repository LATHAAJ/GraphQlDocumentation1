package com.graphQl.document1.model;

public record Player(Integer id, String name, Team team, String city, Integer age, String position, Integer jerseyNumber, Double salary, Boolean isActive) {
}
