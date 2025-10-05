package com.graphQl.document1.service;

import com.graphQl.document1.model.Player;
import com.graphQl.document1.model.Team;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class PlayerService {

private List<Player> playerList = new ArrayList<>();
AtomicInteger id = new AtomicInteger(0);

// Query Methods
public List<Player> findAll() {
  return playerList;
}

public Optional<Player> findById(Integer id) {
  return playerList.stream()
          .filter(player -> player.id().equals(id)).findFirst();
}

public List<Player> findByTeam(Team team) {
  return playerList.stream()
          .filter(player -> player.team() == team)
          .collect(Collectors.toList());
}

public Optional<Player> findByName(String name) {
  return playerList.stream()
          .filter(player -> player.name() != null && player.name().equalsIgnoreCase(name))
          .findFirst();
}

public List<Player> findByPosition(String position) {
  return playerList.stream()
          .filter(player -> player.position() != null && player.position().equalsIgnoreCase(position))
          .collect(Collectors.toList());
}

public List<Player> findActivePlayers() {
  return playerList.stream()
          .filter(player -> player.isActive() != null && player.isActive())
          .collect(Collectors.toList());
}

public List<Player> findPlayersByAgeRange(Integer minAge, Integer maxAge) {
  return playerList.stream()
          .filter(player -> player.age() != null && player.age() >= minAge && player.age() <= maxAge)
          .collect(Collectors.toList());
}

public List<Player> findPlayersBySalaryRange(Double minSalary, Double maxSalary) {
  return playerList.stream()
          .filter(player -> player.salary() != null && player.salary() >= minSalary && player.salary() <= maxSalary)
          .collect(Collectors.toList());
}

public Integer getPlayerCount() {
  return playerList.size();
}

public Integer getTeamPlayerCount(Team team) {
  return (int) playerList.stream()
          .filter(player -> player.team() == team)
          .count();
}

// Mutation Methods
public Player createPlayer(String name, Team team, String city, Integer age, String position, Integer jerseyNumber, Double salary) {
  Player player = new Player(id.incrementAndGet(), name, team, city, age, position, jerseyNumber, salary, true);
  playerList.add(player);
  return player;
}

public Optional<Player> updatePlayer(Integer id, String name, Team team, String city, Integer age, String position, Integer jerseyNumber, Double salary, Boolean isActive) {
  return playerList.stream()
          .filter(player -> player.id().equals(id))
          .findFirst()
          .map(existingPlayer -> {
            Player updatedPlayer = new Player(
                id,
                name != null ? name : existingPlayer.name(),
                team != null ? team : existingPlayer.team(),
                city != null ? city : existingPlayer.city(),
                age != null ? age : existingPlayer.age(),
                position != null ? position : existingPlayer.position(),
                jerseyNumber != null ? jerseyNumber : existingPlayer.jerseyNumber(),
                salary != null ? salary : existingPlayer.salary(),
                isActive != null ? isActive : existingPlayer.isActive()
            );
            int index = playerList.indexOf(existingPlayer);
            playerList.set(index, updatedPlayer);
            return updatedPlayer;
          });
}

public Boolean deletePlayer(Integer id) {
  return playerList.removeIf(player -> player.id().equals(id));
}

public Optional<Player> transferPlayer(Integer id, Team newTeam) {
  return playerList.stream()
          .filter(player -> player.id().equals(id))
          .findFirst()
          .map(existingPlayer -> {
            Player updatedPlayer = new Player(
                existingPlayer.id(),
                existingPlayer.name(),
                newTeam,
                existingPlayer.city(),
                existingPlayer.age(),
                existingPlayer.position(),
                existingPlayer.jerseyNumber(),
                existingPlayer.salary(),
                existingPlayer.isActive()
            );
            int index = playerList.indexOf(existingPlayer);
            playerList.set(index, updatedPlayer);
            return updatedPlayer;
          });
}

public Optional<Player> activatePlayer(Integer id) {
  return updatePlayer(id, null, null, null, null, null, null, null, true);
}

public Optional<Player> deactivatePlayer(Integer id) {
  return updatePlayer(id, null, null, null, null, null, null, null, false);
}

public Optional<Player> updatePlayerSalary(Integer id, Double newSalary) {
  return updatePlayer(id, null, null, null, null, null, null, newSalary, null);
}

@PostConstruct
private void init() {
  // Initialize players with comprehensive data
  playerList.add(new Player(id.incrementAndGet(), "MS Dhoni", Team.CSK, "Chennai", 42, "Wicket Keeper", 7, 12000000.0, true));
  playerList.add(new Player(id.incrementAndGet(), "Rohit Sharma", Team.MI, "Mumbai", 36, "Batsman", 45, 15000000.0, true));
  playerList.add(new Player(id.incrementAndGet(), "Jaspreet Bumrah", Team.MI, "Mumbai", 30, "Bowler", 93, 12000000.0, true));
  playerList.add(new Player(id.incrementAndGet(), "Rishabh Pant", Team.DC, "Delhi", 26, "Wicket Keeper", 17, 16000000.0, true));
  playerList.add(new Player(id.incrementAndGet(), "Suresh Raina", Team.CSK, "Chennai", 37, "Batsman", 3, 11000000.0, false));
  playerList.add(new Player(id.incrementAndGet(), "Virat Kohli", Team.RCB, "Bangalore", 35, "Batsman", 18, 17000000.0, true));
  playerList.add(new Player(id.incrementAndGet(), "Hardik Pandya", Team.GT, "Ahmedabad", 30, "All Rounder", 33, 15000000.0, true));
  playerList.add(new Player(id.incrementAndGet(), "KL Rahul", Team.LSG, "Lucknow", 31, "Batsman", 1, 17000000.0, true));
}
}
