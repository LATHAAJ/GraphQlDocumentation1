package com.graphQl.document1.service;

import com.graphQl.document1.model.Player;
import com.graphQl.document1.model.Team;
import com.graphQl.document1.model.Position;
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

  public List<Player> findByPosition(Position position) {
    return playerList.stream()
            .filter(player -> player.position() == position)
            .collect(Collectors.toList());
  }

  public Player createPlayer(String name, Team team, String city, Position position) {
    Player player = new Player(id.incrementAndGet(), name, team, city, position);
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
    // Initialize players with enhanced data including cities and positions
    playerList.add(new Player(id.incrementAndGet(), "MS Dhoni", Team.CSK, "Chennai", Position.WICKET_KEEPER));
    playerList.add(new Player(id.incrementAndGet(), "Rohit Sharma", Team.MI, "Mumbai", Position.BATSMAN));
    playerList.add(new Player(id.incrementAndGet(), "Jaspreet Bumrah", Team.MI, "Mumbai", Position.BOWLER));
    playerList.add(new Player(id.incrementAndGet(), "Rishabh Pant", Team.DC, "Delhi", Position.WICKET_KEEPER));
    playerList.add(new Player(id.incrementAndGet(), "Suresh Raina", Team.CSK, "Chennai", Position.ALL_ROUNDER));
    playerList.add(new Player(id.incrementAndGet(), "Virat Kohli", Team.RCB, "Bangalore", Position.CAPTAIN));
  }
  }
