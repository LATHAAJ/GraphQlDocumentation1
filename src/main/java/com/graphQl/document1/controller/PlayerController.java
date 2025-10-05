package com.graphQl.document1.controller;

import com.graphQl.document1.model.Player;
import com.graphQl.document1.model.Team;
import com.graphQl.document1.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class PlayerController {
  private final PlayerService playerService;

  // Query Mappings
  @QueryMapping
  public List<Player> findAll() {
    return playerService.findAll();
  }

  @QueryMapping
  public Optional<Player> findById(@Argument Integer id) {
    return playerService.findById(id);
  }

  @QueryMapping
  public List<Player> findByTeam(@Argument Team team) {
    return playerService.findByTeam(team);
  }

  @QueryMapping
  public Optional<Player> findByName(@Argument String name) {
    return playerService.findByName(name);
  }

  @QueryMapping
  public List<Player> findByPosition(@Argument String position) {
    return playerService.findByPosition(position);
  }

  @QueryMapping
  public List<Player> findActivePlayers() {
    return playerService.findActivePlayers();
  }

  @QueryMapping
  public List<Player> findPlayersByAgeRange(@Argument Integer minAge, @Argument Integer maxAge) {
    return playerService.findPlayersByAgeRange(minAge, maxAge);
  }

  @QueryMapping
  public List<Player> findPlayersBySalaryRange(@Argument Double minSalary, @Argument Double maxSalary) {
    return playerService.findPlayersBySalaryRange(minSalary, maxSalary);
  }

  @QueryMapping
  public Integer getPlayerCount() {
    return playerService.getPlayerCount();
  }

  @QueryMapping
  public Integer getTeamPlayerCount(@Argument Team team) {
    return playerService.getTeamPlayerCount(team);
  }

  // Mutation Mappings
  @MutationMapping
  public Player createPlayer(@Argument String name, @Argument Team team, @Argument String city, 
                           @Argument Integer age, @Argument String position, 
                           @Argument Integer jerseyNumber, @Argument Double salary) {
    return playerService.createPlayer(name, team, city, age, position, jerseyNumber, salary);
  }

  @MutationMapping
  public Optional<Player> updatePlayer(@Argument Integer id, @Argument String name, 
                                      @Argument Team team, @Argument String city, 
                                      @Argument Integer age, @Argument String position, 
                                      @Argument Integer jerseyNumber, @Argument Double salary, 
                                      @Argument Boolean isActive) {
    return playerService.updatePlayer(id, name, team, city, age, position, jerseyNumber, salary, isActive);
  }

  @MutationMapping
  public Boolean deletePlayer(@Argument Integer id) {
    return playerService.deletePlayer(id);
  }

  @MutationMapping
  public Optional<Player> transferPlayer(@Argument Integer id, @Argument Team newTeam) {
    return playerService.transferPlayer(id, newTeam);
  }

  @MutationMapping
  public Optional<Player> activatePlayer(@Argument Integer id) {
    return playerService.activatePlayer(id);
  }

  @MutationMapping
  public Optional<Player> deactivatePlayer(@Argument Integer id) {
    return playerService.deactivatePlayer(id);
  }

  @MutationMapping
  public Optional<Player> updatePlayerSalary(@Argument Integer id, @Argument Double newSalary) {
    return playerService.updatePlayerSalary(id, newSalary);
  }
}
