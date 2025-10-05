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

  public Player createPlayer(String name, Team team, String city) {
    Player player = new Player(id.incrementAndGet(), name, team, city);
    playerList.add(player);
    return player;
  }

  public Player removePlayer(Integer id) {
    Player player = playerList.stream().filter(item -> item.id() == id).findFirst().orElseThrow(() -> new IllegalArgumentException());
    playerList.remove(player);
    return player;
  }


  @PostConstruct
  private void init() {
    // Initialize players with enhanced data including cities
    playerList.add(new Player(id.incrementAndGet(), "MS Dhoni", Team.CSK, "Chennai"));
    playerList.add(new Player(id.incrementAndGet(), "Rohit Sharma", Team.MI, "Mumbai"));
    playerList.add(new Player(id.incrementAndGet(), "Jaspreet Bumrah", Team.MI, "Mumbai"));
    playerList.add(new Player(id.incrementAndGet(), "Rishabh Pant", Team.DC, "Delhi"));
    playerList.add(new Player(id.incrementAndGet(), "Suresh Raina", Team.CSK, "Chennai"));
  }
  }
