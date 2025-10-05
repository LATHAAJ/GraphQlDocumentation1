package com.graphQl.document1.controller;

import com.graphQl.document1.model.Player;
import com.graphQl.document1.model.Team;
import com.graphQl.document1.model.Position;
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
  public List<Player> findByPosition(@Argument Position position) {
    return playerService.findByPosition(position);
  }

  @MutationMapping
  public Player createPlayer(@Argument String name, @Argument Team team, @Argument String city, @Argument Position position) {
    return playerService.createPlayer(name, team, city, position);
  }
}
